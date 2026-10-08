'use client';

import {useEffect, useRef, useState} from 'react';
import EditorialImage from './editorial-image';

type Particle = {x:number;y:number;ox:number;oy:number;vx:number;vy:number;color:string};

/** Samples only the supplied portrait; no external assets or paid registry. */
export default function ParticlePortrait({src,alt,note}:{src:string;alt:string;note:string}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const [enabled,setEnabled] = useState(true);
  const [ready,setReady] = useState(false);
  const [reduced,setReduced] = useState(true);
  useEffect(() => {
    const query=matchMedia('(prefers-reduced-motion: reduce)');
    const update=()=>setReduced(query.matches);
    update(); query.addEventListener('change',update);
    return ()=>query.removeEventListener('change',update);
  },[]);
  useEffect(() => {
    setReady(false);
    const element=wrapper.current, surface=canvas.current;
    if (!element || !surface || !src || !enabled || reduced) return;
    const context=surface.getContext('2d');
    if (!context) return;
    let particles:Particle[]=[], frame=0, visible=true, disposed=false, width=0,height=0,last=0;
    const pointer={x:-10000,y:-10000};
    const image=new window.Image();
    // Same-origin CMS images are supported; cross-origin images require CORS.
    image.crossOrigin='anonymous';
    const sample=()=>{
      if (!image.naturalWidth || disposed) return;
      cancelAnimationFrame(frame);
      width=element.clientWidth; height=element.clientHeight;
      if (!width || !height) return;
      const scale=Math.min(width/image.naturalWidth,height/image.naturalHeight);
      const iw=image.naturalWidth*scale,ih=image.naturalHeight*scale;
      const buffer=document.createElement('canvas'); buffer.width=Math.ceil(width);buffer.height=Math.ceil(height);
      const ctx=buffer.getContext('2d',{willReadFrequently:true}); if(!ctx)return;
      ctx.drawImage(image,(width-iw)/2,height-ih,iw,ih);
      let pixels:Uint8ClampedArray;
      try {pixels=ctx.getImageData(0,0,buffer.width,buffer.height).data;} catch {setReady(false);return;}
      const ratio=Math.min(devicePixelRatio||1,2);
      surface.width=Math.round(width*ratio);surface.height=Math.round(height*ratio);
      context.setTransform(ratio,0,0,ratio,0,0);
      particles=[];
      const step=Math.max(3,Math.ceil(Math.sqrt(width*height/18000)));
      for(let y=0;y<height;y+=step)for(let x=0;x<width;x+=step){
        const i=(y*buffer.width+x)*4;
        if(pixels[i+3]<100)continue;
        particles.push({x,y,ox:x,oy:y,vx:0,vy:0,color:`rgba(${pixels[i]},${pixels[i+1]},${pixels[i+2]},${pixels[i+3]/255})`});
      }
      setReady(true); draw(performance.now());
    };
    const draw=(time:number)=>{
      if(disposed || !visible || document.hidden)return;
      const dt=Math.min(2,(time-last)/16.67||1);last=time;
      context.clearRect(0,0,width,height);
      for(const p of particles){
        const dx=p.x-pointer.x,dy=p.y-pointer.y,d=Math.hypot(dx,dy),radius=Math.min(width*.28,115);
        if(d<radius){const f=(1-d/radius)*1.6; p.vx+=(dx/(d||1)-dy/(d||1)*.5)*f*dt;p.vy+=(dy/(d||1)+dx/(d||1)*.5)*f*dt;}
        p.vx+=(p.ox-p.x)*.018*dt;p.vy+=(p.oy-p.y)*.018*dt;
        p.vx*=Math.pow(.87,dt);p.vy*=Math.pow(.87,dt);p.x+=p.vx*dt;p.y+=p.vy*dt;
        context.fillStyle=p.color;context.fillRect(p.x,p.y,2.2,2.2);
      }
      frame=requestAnimationFrame(draw);
    };
    const restart=()=>{cancelAnimationFrame(frame);last=0;if(visible&&!document.hidden)frame=requestAnimationFrame(draw);};
    const move=(event:PointerEvent)=>{const rect=element.getBoundingClientRect();pointer.x=event.clientX-rect.left;pointer.y=event.clientY-rect.top;};
    const leave=()=>{pointer.x=pointer.y=-10000;};
    const resize=new ResizeObserver(()=>{cancelAnimationFrame(frame);sample();});resize.observe(element);
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;restart();});observer.observe(element);
    element.addEventListener('pointermove',move);element.addEventListener('pointerdown',move);element.addEventListener('pointerleave',leave);element.addEventListener('pointerup',leave);
    document.addEventListener('visibilitychange',restart);
    image.onload=sample;image.onerror=()=>setReady(false);image.src=src;
    return()=>{disposed=true;cancelAnimationFrame(frame);resize.disconnect();observer.disconnect();element.removeEventListener('pointermove',move);element.removeEventListener('pointerdown',move);element.removeEventListener('pointerleave',leave);element.removeEventListener('pointerup',leave);document.removeEventListener('visibilitychange',restart);};
  },[src,enabled,reduced]);
  return <>
    <div ref={wrapper} className={`mr-hero-person particle-portrait ${src?'has-image':''} ${ready?'particles-ready':''}`}>
      <EditorialImage src={src} alt={alt} note={note} portrait priority/>
      <canvas ref={canvas} aria-hidden="true"/>
    </div>
    {src&&!reduced&&<button type="button" className="portrait-particle-control" aria-pressed={enabled} onClick={()=>setEnabled(!enabled)}>{enabled?'关闭粒子效果':'开启粒子效果'}</button>}
  </>;
}
