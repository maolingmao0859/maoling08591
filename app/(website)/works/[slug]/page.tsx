import {getSite} from '@/lib/content';
import ProjectContent from '@/components/project-content';
export const dynamic='force-dynamic';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const site=await getSite();return {title:site.works.find(w=>w.slug===slug)?.name??'作品未找到'}}
export default async function Work({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return <ProjectContent site={await getSite()} slug={slug}/>};
