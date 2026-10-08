import {site} from '@/content/site';
import EditorialImage from '@/components/editorial-image';
import {notFound} from 'next/navigation';
import {PageIntro,MoreLink} from '@/components/shared';
export function generateStaticParams(){return site.works.map(w=>({slug:w.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return {title:site.works.find(w=>w.slug===slug)?.name??'作品未找到'}}
export default async function Work({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const w=site.works.find(w=>w.slug===slug);if(!w)notFound();return <main id="main" className="page-wrap"><MoreLink href="/works">返回作品档案</MoreLink><PageIntro label={w.category} title={w.name} description={w.english}/><div className="detail-image image-frame"><EditorialImage src={w.image} alt={`${w.name}项目素材待确认`} note={w.imageNote}/></div><div className="detail-copy"><h2>关于项目</h2><div><p className="body-copy">{w.description}</p><dl><div><dt>项目状态</dt><dd>{w.status}</dd></div><div><dt>项目地点</dt><dd>待补充</dd></div><div><dt>项目年份</dt><dd>待补充</dd></div><div><dt>设计职责</dt><dd>待补充</dd></div><div><dt>探索关键词</dt><dd>{w.material}</dd></div></dl><p className="placeholder">此页为作品展示结构初稿，未填写的字段不代表已确认的项目事实。</p></div></div><MoreLink href={`/works/${site.works.find(x=>x.slug!==slug)!.slug}`}>下一个作品</MoreLink></main>}
