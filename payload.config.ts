import path from 'node:path';
import { buildConfig, APIError, type Field } from 'payload';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { zh } from '@payloadcms/translations/languages/zh';
import sharp from 'sharp';
import { adminOnly, publishedOrAdmin } from './cms/access';
import { site } from './content/site';

const text = (name: string, label: string, required = false): Field => ({ name, label, type: 'text', required });
const labels: Record<string,string> = {brand:'品牌名称',name:'个人姓名',englishName:'身份定位',title:'标题',subtitle:'英文副标题',bio:'个人简介',bioNote:'简介备注',email:'联系邮箱',wechat:'微信',instagram:'社交主页地址',location:'所在地',home:'首页各板块',hero:'首页首屏',philosophy:'创作理念',works:'精选作品',about:'关于我',journal:'探索手记',contact:'联系',label:'栏目标签',text:'正文',english:'英文文案',note:'备注',image:'图片路径（旧素材）',imageAlt:'图片说明',imageNote:'图片注释',link:'链接文字',intro:'介绍',portrait:'人物图片路径（旧素材）',portraitAlt:'人物图片说明',portraitNote:'人物图片注释',video:'视频路径（旧素材）',poster:'视频封面路径（旧素材）',pauseLabel:'暂停按钮文字',playLabel:'播放按钮文字',disciplines:'创作方向',index:'页码',scroll:'滚动提示',emailLabel:'邮箱标签',wechatLabel:'微信标签',emailPlaceholder:'邮箱为空时提示',wechatPlaceholder:'微信为空时提示'};
function fieldsFor(value: Record<string, unknown>): Field[] {
 return Object.entries(value).filter(([,v])=>typeof v==='string'||(v&&typeof v==='object'&&!Array.isArray(v))).map(([name,v])=>typeof v==='string'?{name,label:labels[name]||name,type:'textarea' as const}:{name,label:labels[name]||name,type:'group' as const,fields:fieldsFor(v as Record<string,unknown>)});
}
const settingsFields = fieldsFor({brand:site.brand,name:site.name,englishName:site.englishName,title:site.title,subtitle:site.subtitle,bio:site.bio,bioNote:site.bioNote,email:site.email,wechat:site.wechat,instagram:site.instagram,location:site.location,home:site.home});
settingsFields.push({name:'assets',label:'首页与个人图片 / 视频',type:'group',fields:[
 {name:'portrait',label:'首屏人物（透明 PNG / WebP）',type:'upload',relationTo:'media',filterOptions:{mimeType:{contains:'image/'}}},
 {name:'video',label:'首屏背景视频（MP4）',type:'upload',relationTo:'media',filterOptions:{mimeType:{equals:'video/mp4'}}},
 {name:'poster',label:'视频封面',type:'upload',relationTo:'media',filterOptions:{mimeType:{contains:'image/'}}},
 {name:'about',label:'旅行 / 工作纪实照片',type:'upload',relationTo:'media',filterOptions:{mimeType:{contains:'image/'}}},
]});
export default buildConfig({
 secret: process.env.PAYLOAD_SECRET || 'cms-disabled-config-only-not-for-use',
 serverURL: process.env.CMS_SERVER_URL || 'http://localhost:3000',
 admin:{ avatar:'default', components:{beforeDashboard:['/cms/components/Welcome#default']}, user:'users', importMap:{baseDir:path.resolve('.')}, meta:{titleSuffix:' · MR.CAT 内容管理'}, suppressHydrationWarning:true },
 i18n:{supportedLanguages:{zh},fallbackLanguage:'zh'},
 typescript:{outputFile:path.resolve('payload-types.ts')},
 db:sqliteAdapter({client:{url:process.env.DATABASE_URI||`file:${path.resolve('.cms/content.db')}`},push:process.env.CMS_ALLOW_SCHEMA_PUSH==='true',migrationDir:path.resolve('cms/migrations')}),
 sharp,
 upload:{limits:{fileSize:50*1024*1024}},
 collections:[
 {slug:'users',labels:{singular:'管理员',plural:'管理员'},auth:{maxLoginAttempts:5,lockTime:10*60*1000,tokenExpiration:2*60*60,cookies:{sameSite:'Lax',secure:process.env.NODE_ENV==='production'&&process.env.CMS_SERVER_URL?.startsWith('https://')===true}},admin:{useAsTitle:'email'},access:{admin:adminOnly,read:adminOnly,create:adminOnly,update:adminOnly,delete:adminOnly},hooks:{beforeOperation:[({operation})=>{if(operation==='forgotPassword')throw new APIError('请联系站点负责人重置密码。邮件服务尚未配置。',400);}],beforeChange:[({operation,req,data})=>{if(typeof data.password==='string'&&data.password.length<12)throw new APIError('管理员密码至少需要 12 位。',400);if(operation==='create'&&!req.user&&req.context?.cmsBootstrap!==true)throw new APIError('请联系网站管理员开通账号。本站不开放注册。',403);}]},fields:[text('name','管理员姓名')]},
 {slug:'media',labels:{singular:'素材',plural:'图片与视频'},admin:{useAsTitle:'alt'},access:{read:()=>true,create:adminOnly,update:adminOnly,delete:adminOnly},upload:{staticDir:process.env.CMS_STORAGE_DIR||path.resolve('.cms/uploads'),mimeTypes:['image/jpeg','image/png','image/webp','image/avif','video/mp4'],imageSizes:[{name:'card',width:1000,withoutEnlargement:true,formatOptions:{format:'webp',options:{quality:85}}},{name:'large',width:1800,withoutEnlargement:true,formatOptions:{format:'webp',options:{quality:85}}}]},fields:[text('alt','图片说明（供访客与读屏使用）',true),text('caption','素材备注')]},
 {slug:'projects',defaultSort:'order',labels:{singular:'作品',plural:'作品管理'},admin:{useAsTitle:'name',defaultColumns:['name','status','order','_status'],preview:(doc)=>`${process.env.CMS_SERVER_URL||''}/preview/project/${doc.slug}`},access:{read:publishedOrAdmin,readVersions:adminOnly,create:adminOnly,update:adminOnly,delete:adminOnly},versions:{drafts:true,maxPerDoc:20},fields:[
 text('name','中文项目名称',true),text('english','英文项目名称',true),{name:'slug',label:'页面地址',type:'text',required:true,unique:true,validate:(v:unknown)=>typeof v==='string'&&/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v)?true:'请使用小写英文、数字和短横线。',admin:{description:'修改会改变作品网址；已有作品建议保持不变。'}},text('category','项目类别',true),text('status','项目状态',true),{name:'order',label:'展示顺序（数字越小越靠前）',type:'number',defaultValue:0},
 {name:'cover',label:'封面图',type:'upload',relationTo:'media',filterOptions:{mimeType:{contains:'image/'}}},text('image','旧封面路径'),text('imageNote','封面注释'),{name:'description',label:'项目介绍 / 设计概念',type:'textarea',required:true},text('material','关键词'),text('location','项目地点'),text('year','设计年份'),text('area','面积'),text('role','设计职责'),{name:'closing',label:'项目结束语',type:'textarea'},
 {name:'gallery',label:'详情图片（拖动左侧手柄调整顺序）',type:'array',labels:{singular:'详情图片',plural:'详情图片'},fields:[{name:'media',label:'图片',type:'upload',relationTo:'media',filterOptions:{mimeType:{contains:'image/'}},required:true},text('alt','图片说明',true),text('caption','图片标题 / 注释'),{name:'kind',label:'素材类型',type:'select',required:true,options:['现场照片','设计效果图','概念示意','总平面图']}]},
 ]},
 {slug:'journal',defaultSort:'order',labels:{singular:'手记',plural:'Journal 手记'},admin:{useAsTitle:'title',defaultColumns:['title','label','order','_status']},access:{read:publishedOrAdmin,readVersions:adminOnly,create:adminOnly,update:adminOnly,delete:adminOnly},versions:{drafts:true,maxPerDoc:20},fields:[text('slug','栏目地址标识',true),text('label','栏目中英文标签',true),text('title','文章标题',true),{name:'text',label:'正文',type:'textarea'}, {name:'cover',label:'栏目图片',type:'upload',relationTo:'media',filterOptions:{mimeType:{contains:'image/'}}},text('image','旧图片路径'),{name:'order',label:'展示顺序',type:'number',defaultValue:0}]},
 ],
 globals:[{slug:'site-settings',label:'网站设置',access:{read:publishedOrAdmin,readVersions:adminOnly,update:adminOnly},versions:{drafts:true,max:20},admin:{preview:()=>`${process.env.CMS_SERVER_URL||''}/preview`},fields:settingsFields}],
});
