'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useState} from 'react';
import type {SiteContent} from '@/lib/content';
export default function Header({site}:{site:Pick<SiteContent,"brand"|"englishName"|"navigation">}){const path=usePathname();const [open,setOpen]=useState(false);useEffect(()=>{setOpen(false)},[path]);return <header className="header mr-header"><Link href="/" className="brand" onClick={()=>setOpen(false)}>{site.brand}<span>{site.englishName}</span></Link><button className="menu" aria-expanded={open} aria-controls="navigation" onClick={()=>setOpen(!open)}>{open?'关闭 −':'菜单 +'}</button><nav id="navigation" className={open?'nav open':'nav'} aria-label="主导航">{site.navigation.map(({href,label,chinese})=><Link key={href} href={href} aria-current={(path===href||path.startsWith(`${href}/`))?'page':undefined} onClick={()=>setOpen(false)}><span className="nav-english" lang="en">{label}</span><span className="nav-chinese">{chinese}</span></Link>)}</nav></header>}
