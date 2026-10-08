import Link from 'next/link';
import {ArrowUpRight,ArrowRight} from 'lucide-react';
import {site} from '@/content/site';
import Reveal from './reveal';
import EditorialImage from './editorial-image';
export function Label({number,children}:{number:string;children:React.ReactNode}){return <div className="section-label"><span>{number}</span>{children}</div>}
export function WorkGrid(){return <div className="work-grid">{site.works.map((w,i)=><Reveal key={w.slug}><Link className="work-card" href={`/works/${w.slug}`}><div className="image-frame"><EditorialImage src={w.image} alt={`${w.name}展示素材待确认`} note={w.imageNote} /><span className="image-arrow"><ArrowUpRight size={23}/></span></div><div className="work-meta"><span>{w.category}</span><span>0{i+1}</span></div><h3>{w.name}</h3><p className="english">{w.english}</p><p className="placeholder">{w.status}</p></Link></Reveal>)}</div>}
export function ContactBlock(){return <section className="contact-block"><Label number="05">LET’S CONNECT / 联系</Label><div className="contact-row"><div><p className="eyebrow">EVERY POSSIBILITY STARTS WITH A CONVERSATION</p><h2>让新的可能，<br/>从一次对话开始。</h2></div><Link className="circle-link" href="/contact" aria-label="查看合作联系方式"><ArrowUpRight size={36}/></Link></div><div className="contact-bottom"><span>空间设计 · 自然文旅 · 创意合作</span><span>联系方式待填写</span></div></section>}
export function PageIntro({label,title,description}:{label:string;title:string;description:string}){return <Reveal className="page-intro"><p className="eyebrow">{label}</p><h1>{title}</h1><p>{description}</p></Reveal>}
export function MoreLink({href,children}:{href:string;children:React.ReactNode}){return <Link href={href} className="more-link">{children}<ArrowRight size={17}/></Link>}
