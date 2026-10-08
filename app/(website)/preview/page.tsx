import {getSite} from '@/lib/content';
import HomeContent from '@/components/home-content';
export const dynamic='force-dynamic';
export const metadata={title:'草稿预览',robots:{index:false,follow:false}};
export default async function Preview(){return <><p className="preview-banner">管理员草稿预览 · 访客不会看到此版本</p><HomeContent site={await getSite(true)}/></>}
