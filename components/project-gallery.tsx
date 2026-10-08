'use client';
import Image from 'next/image';
import {useEffect,useRef,useState} from 'react';
import type {ProjectImage} from '@/content/projects';
import Reveal from './reveal';
export default function ProjectGallery({images}:{images:ProjectImage[]}){
 const [active,setActive]=useState<number|null>(null);const dialog=useRef<HTMLDialogElement>(null);const trigger=useRef<HTMLButtonElement|null>(null);
 useEffect(()=>{if(active!==null){dialog.current?.showModal();const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=previous}}},[active]);
 function close(){dialog.current?.close();setActive(null);trigger.current?.focus()}
 function step(offset:number){setActive(v=>v===null?null:(v+offset+images.length)%images.length)}
 if(!images.length)return <section className="gallery-pending"><p className="eyebrow">PROJECT IMAGES / 项目影像</p><h2>真实素材，等待接入。</h2><p>上传包暂未能导入；实景、设计效果图与规划图将在核对后分别展示。</p></section>;
 return <><div className="project-gallery">{images.map((im,i)=><Reveal key={im.src} className={`gallery-item ${im.height>im.width?'portrait':'landscape'} ${im.kind==='总平面图'?'plan':''}`}><figure><button aria-label={`放大图片：${im.alt}`} onClick={e=>{trigger.current=e.currentTarget;setActive(i)}}><Image src={im.src} alt={im.alt} width={im.width} height={im.height} sizes="(max-width: 600px) 88vw, 86vw" loading="lazy"/></button><figcaption><span>{im.kind}</span>{im.caption}</figcaption></figure></Reveal>)}</div><dialog ref={dialog} className="image-dialog" onCancel={e=>{e.preventDefault();close()}} onClick={e=>{if(e.target===e.currentTarget)close()}} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();step(1)}if(e.key==='ArrowLeft'){e.preventDefault();step(-1)}}} aria-label="项目图片放大预览"><button className="dialog-close" onClick={close} aria-label="关闭图片预览">关闭 ×</button>{active!==null&&<><div className="dialog-image"><Image src={images[active].src} alt={images[active].alt} width={images[active].width} height={images[active].height} sizes="95vw"/></div><p>{images[active].kind} / {images[active].caption}</p><div className="dialog-controls"><button onClick={()=>step(-1)} aria-label="上一张图片">← 上一张</button><span>{active+1} / {images.length}</span><button onClick={()=>step(1)} aria-label="下一张图片">下一张 →</button></div></>}</dialog></>;
}
