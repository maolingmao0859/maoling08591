import 'server-only';
import {cache} from 'react';
import {getPayload} from 'payload';
import config from '@payload-config';
import {headers} from 'next/headers';
import {redirect} from 'next/navigation';
import {site as defaults} from '@/content/site';
import type {Project as FrontendProject} from '@/content/projects';
import type {Media,Project as CMSProject,SiteSetting,Journal} from '@/payload-types';
import {cmsEnabled,remoteCMS} from './cms-enabled';
export type SiteContent = typeof defaults;
export const getCMS = cache(()=>getPayload({config}));
export function mediaURL(value:number|Media|null|undefined):string{return value&&typeof value==='object'&&value.filename?`${remoteCMS()}/api/media/file/${encodeURIComponent(value.filename)}`:''}
export function projectContent(doc:CMSProject):FrontendProject {
 return {slug:doc.slug,name:doc.name,english:doc.english,category:doc.category,status:doc.status,image:mediaURL(doc.cover)||doc.image||'',imageNote:doc.imageNote||'',description:doc.description,material:doc.material||'',location:doc.location||'待确认',year:doc.year||'待确认',area:doc.area||'待确认',role:doc.role||'待确认',closing:doc.closing||'',gallery:(doc.gallery||[]).flatMap(item=>{const media=item.media;if(!media||typeof media!=='object'||!mediaURL(media))return [];return [{src:mediaURL(media),alt:item.alt||media.alt,caption:item.caption||'',kind:item.kind,width:media.width||1600,height:media.height||1000}]})};
}
function mergeText(target:Record<string,unknown>, source:Record<string,unknown>){for(const [key,value] of Object.entries(source)){if(!(key in target)||value===null||value===undefined)continue;if(typeof value==='string')target[key]=value;else if(typeof value==='object'&&!Array.isArray(value)&&target[key]&&typeof target[key]==='object')mergeText(target[key] as Record<string,unknown>,value as Record<string,unknown>)} }
export const getSite = cache(async (draft=false):Promise<SiteContent>=>{
 const remote=remoteCMS();
 let settings:SiteSetting,projects:{docs:CMSProject[]},journal:{docs:Journal[]};
 if(remote){
  if(draft)redirect(`${remote}/preview`);
  const read=async(path:string)=>{const response=await fetch(`${remote}/api/${path}`,{cache:'no-store'});if(!response.ok)throw new Error('内容服务暂时不可用，请检查后台服务器。');return response.json()};
  [settings,projects,journal]=await Promise.all([read('globals/site-settings?depth=1'),read('projects?depth=1&limit=200&sort=order'),read('journal?depth=1&limit=200&sort=order')]);
 }else{
  if(!cmsEnabled())return structuredClone(defaults);
  const cms=await getCMS();
  const user=draft?(await cms.auth({headers:await headers()})).user:null;
  if(draft&&!user)redirect('/admin/login');
  [settings,projects,journal]=await Promise.all([
   cms.findGlobal({slug:'site-settings',depth:1,draft,overrideAccess:false,user}),
   cms.find({collection:'projects',depth:1,limit:200,sort:'order',draft,overrideAccess:false,user}),
   cms.find({collection:'journal',depth:1,limit:200,sort:'order',draft,overrideAccess:false,user}),
  ]);
 }
 const result=structuredClone(defaults);
 mergeText(result as unknown as Record<string,unknown>,settings as unknown as Record<string,unknown>);
 const assets=settings.assets;
 if(assets){if(assets.portrait)result.home.hero.portrait=mediaURL(assets.portrait);if(assets.video)result.home.hero.video=mediaURL(assets.video);if(assets.poster)result.home.hero.poster=mediaURL(assets.poster);if(assets.about)result.home.about.image=mediaURL(assets.about)}
 result.works=projects.docs.map(projectContent);
 result.journal=journal.docs.map(j=>({id:j.slug,label:j.label,title:j.title,text:j.text||'',image:mediaURL(j.cover)||j.image||''}));
 return result;
});
