import {redirect} from 'next/navigation';
import {remoteCMS} from '@/lib/cms-enabled';
import {getSite} from '@/lib/content';
import ProjectContent from '@/components/project-content';
export const dynamic='force-dynamic';
export const metadata={title:'作品草稿预览',robots:{index:false,follow:false}};
export default async function Preview({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(remoteCMS())redirect(`${remoteCMS()}/preview/project/${encodeURIComponent(slug)}`);return <><p className="preview-banner">管理员草稿预览 · 尚未发布</p><ProjectContent site={await getSite(true)} slug={slug}/></>}
