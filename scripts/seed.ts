import path from 'node:path';
import {getPayload} from 'payload';
import config from '../payload.config';
import {cmsEnabled} from '../lib/cms-enabled';
if(!cmsEnabled())throw new Error('请先配置 CMS_ENABLED=true、至少 32 字符的 PAYLOAD_SECRET，且不要设置 CMS_REMOTE_URL。');
import {site} from '../content/site';
const cms=await getPayload({config});
async function upload(src:string,alt:string){if(!src)return null;const filename=path.basename(src);const found=await cms.find({collection:'media',where:{filename:{equals:filename}},limit:1});if(found.docs[0])return found.docs[0].id;return (await cms.create({collection:'media',data:{alt},filePath:path.resolve('public',src.replace(/^\//,''))})).id}
const existing=await cms.findGlobal({slug:'site-settings'});
if(!existing.brand){const assets={portrait:await upload(site.home.hero.portrait,site.home.hero.portraitAlt),video:await upload(site.home.hero.video,'MR.CAT 首页背景视频'),poster:await upload(site.home.hero.poster,'背景视频静态封面'),about:await upload(site.home.about.image,site.home.about.imageAlt)};const data=structuredClone(site);data.home.hero.portrait='';data.home.hero.video='';data.home.hero.poster='';if(assets.about)data.home.about.image='';await cms.updateGlobal({slug:'site-settings',data:{...data,assets,_status:'published'}})}
for(const [order,p] of site.works.entries()){const found=await cms.find({collection:'projects',where:{slug:{equals:p.slug}},limit:1});if(!found.docs.length)await cms.create({collection:'projects',data:{...p,gallery:[],order,_status:'published'}})}
for(const [order,j] of site.journal.entries()){const found=await cms.find({collection:'journal',where:{slug:{equals:j.id}},limit:1});if(!found.docs.length)await cms.create({collection:'journal',data:{slug:j.id,label:j.label,title:j.title,text:j.text,image:j.image,order,_status:'published'}})}
console.log('原有作品、网站设置与手记已导入；再次执行不会覆盖已有内容。');
await cms.destroy();
