import type {Metadata} from 'next';
import {site} from '@/content/site';
import Header from '@/components/header';
import './globals.css';
export const metadata:Metadata={title:{default:'MR.CAT · 独立设计与自由探索',template:'%s · MR.CAT'},description:'Independent Designer / Visual Artist — 空间设计、自然文旅、概念创作、摄影与生活。'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body><a href="#main" className="skip-link">跳至内容</a><Header/>{children}<footer><LinkHome/><span>独立设计师 / 创意探索者</span><span>© {new Date().getFullYear()} MR.CAT</span><a href="#main">回到顶部 ↑</a></footer></body></html>}
function LinkHome(){return <a href="/" className="footer-brand">{site.brand}<span>在既定之外。</span></a>}
