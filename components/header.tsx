'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
const links=[['/about','关于','ABOUT'],['/works','作品','WORKS'],['/journal','记录','JOURNAL'],['/contact','联系','CONTACT']];
export default function Header(){const path=usePathname();const [open,setOpen]=useState(false);return <header className="header"><Link href="/" className="brand" onClick={()=>setOpen(false)}>BEYOND<span>DESIGN & EXPLORATION</span></Link><button className="menu" aria-expanded={open} aria-controls="navigation" onClick={()=>setOpen(!open)}>{open?'关闭 −':'菜单 +'}</button><nav id="navigation" className={open?'nav open':'nav'}>{links.map(([href,cn,en])=><Link key={href} href={href} aria-current={path.startsWith(href)?'page':undefined} onClick={()=>setOpen(false)}>{cn}<span>{en}</span></Link>)}</nav><span className="header-note">独立设计 · 自由探索</span></header>}
