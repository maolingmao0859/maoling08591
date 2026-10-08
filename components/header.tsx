'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
import {site} from '@/content/site';
export default function Header(){const path=usePathname();const [open,setOpen]=useState(false);return <header className="header mr-header"><Link href="/" className="brand" onClick={()=>setOpen(false)}>{site.brand}<span>{site.englishName}</span></Link><button className="menu" aria-expanded={open} aria-controls="navigation" onClick={()=>setOpen(!open)}>{open?'关闭 −':'菜单 +'}</button><nav id="navigation" className={open?'nav open':'nav'} aria-label="主导航">{site.navigation.map(({href,label})=><Link key={href} href={href} aria-current={path.startsWith(href)?'page':undefined} onClick={()=>setOpen(false)}>{label}</Link>)}</nav></header>}
