import {site} from '@/content/site';
import {PageIntro} from '@/components/shared';
import Reveal from '@/components/reveal';
export default function Journal(){return <main id="main" className="page-wrap"><PageIntro label="JOURNAL / 探索手记" title="把日常，留在感知里。" description="旅行、摄影、音乐。以下为栏目示例，真实记录待补充。"/>{site.journal.map((j,i)=><Reveal key={j.id}><article id={j.id} className="journal-entry"><div className="image-frame"><img src={j.image} alt={`${j.label}氛围占位图`}/><span className="image-note">氛围占位图 · 非原创摄影</span></div><div><p className="eyebrow">0{i+1} / {j.label}</p><h2>{j.title}</h2><p className="body-copy">{j.text}</p><span className="placeholder">内容待更新</span></div></article></Reveal>)}</main>}
