'use client';

import {useEffect} from 'react';

/** Delegated micro-interactions also cover buttons mounted later, such as dialogs. */
export default function ButtonMotion(){
  useEffect(()=>{
    const selector='button:not(.gallery-item button), .nav a, .more-link, .circle-link, .mr-hero-bottom a, footer a, .mr-contact-grid a';
    const query=matchMedia('(prefers-reduced-motion: reduce)');
    let active:HTMLElement|null=null;
    let frame=0;
    const reset=()=>{cancelAnimationFrame(frame);if(active){active.style.removeProperty('--pill-x');active.style.removeProperty('--pill-y');active.classList.remove('pill-tracking');active=null;}};
    const move=(event:PointerEvent)=>{
      if(query.matches || event.pointerType!=='mouse'){reset();return;}
      const target=event.target instanceof Element?event.target.closest<HTMLElement>(selector):null;
      if(!target){reset();return;}
      if(target!==active){reset();active=target;}
      cancelAnimationFrame(frame);
      frame=requestAnimationFrame(()=>{
        if(!active)return;
        // offset dimensions are stable while the visual translation follows the cursor.
        const rect=active.getBoundingClientRect();
        const x=Math.max(-5,Math.min(5,(event.clientX-rect.left-rect.width/2)*.12));
        const y=Math.max(-4,Math.min(4,(event.clientY-rect.top-rect.height/2)*.12));
        active.classList.add('pill-tracking');active.style.setProperty('--pill-x',`${x}px`);active.style.setProperty('--pill-y',`${y}px`);
      });
    };
    document.addEventListener('pointermove',move,{passive:true});
    document.documentElement.addEventListener('pointerleave',reset);
    window.addEventListener('blur',reset);window.addEventListener('scroll',reset,{passive:true});query.addEventListener('change',reset);
    return()=>{reset();document.removeEventListener('pointermove',move);document.documentElement.removeEventListener('pointerleave',reset);window.removeEventListener('blur',reset);window.removeEventListener('scroll',reset);query.removeEventListener('change',reset);};
  },[]);
  return null;
}
