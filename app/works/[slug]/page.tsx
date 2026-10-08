import {site} from '@/content/site';
import EditorialImage from '@/components/editorial-image';
import ProjectGallery from '@/components/project-gallery';
import {notFound} from 'next/navigation';
import {PageIntro,MoreLink} from '@/components/shared';
export function generateStaticParams(){return site.works.map(w=>({slug:w.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return {title:site.works.find(w=>w.slug===slug)?.name??'作品未找到'}}
export default async function Work({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const index=site.works.findIndex(w=>w.slug===slug);if(index<0)notFound();const w=site.works[index];const next=site.works[(index+1)%site.works.length];return <main id="main" className="page-wrap project-page"><MoreLink href="/works">返回作品档案</MoreLink><div className="detail-image image-frame project-cover"><EditorialImage src={w.image} alt={`${w.name}项目封面`} note={w.imageNote} priority/></div><PageIntro label={`PROJECT 0${index+1} / ${w.category}`} title={w.name} description={w.english}/><div className="detail-copy"><h2>设计概念</h2><div><p className="body-copy">{w.description}</p><dl>{[['项目状态',w.status],['项目地点',w.location],['设计年份',w.year],['项目面积',w.area],['具体角色',w.role]].map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div></div><ProjectGallery images={w.gallery}/><p className="project-closing">{w.closing}</p><MoreLink href={`/works/${next.slug}`}>Next Project / {next.name}</MoreLink></main>}
