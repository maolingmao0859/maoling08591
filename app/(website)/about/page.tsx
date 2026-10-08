export const dynamic='force-dynamic';
import EditorialImage from '@/components/editorial-image';
import {getSite} from '@/lib/content';
import {PageIntro,ContactBlock} from '@/components/shared';
export default async function About(){const site=await getSite();return <main id="main"><div className="page-wrap"><PageIntro label="ABOUT / 关于" title="保持好奇，持续探索。" description={site.englishName}/><div className="about-grid"><div className="image-frame"><EditorialImage src={site.home.about.image} alt={site.home.about.imageAlt} note={site.home.about.imageNote}/></div><div><p className="eyebrow">{site.englishName}</p><h2>{site.name}</h2><p className="body-copy">{site.bio}</p><p className="placeholder">{site.bioNote}</p><div className="about-tags">空间设计 / 自然文旅 / 概念创作<br/>摄影 / 音乐 / 生活观察</div><p className="body-copy">好的设计，不一定需要更多。<br/>在既定之外，寻找可能。</p></div></div></div><ContactBlock/></main>}
