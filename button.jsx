import React from 'react'
import { cn } from './utils'
export function Button({className='',variant='primary',size='md',...props}){
 const base='inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none'
 const variants={primary:'bg-[#d7ff64] text-[#11120f] hover:bg-white',secondary:'border border-white/20 bg-white/[.04] text-white hover:bg-white/10',ghost:'text-white/70 hover:text-white hover:bg-white/10',light:'bg-[#f4f1e9] text-[#11120f] hover:bg-[#d7ff64]'}
 const sizes={sm:'px-4 py-2 text-xs',md:'px-5 py-3 text-sm',lg:'px-7 py-4 text-sm'}
 return <button className={cn(base,variants[variant],sizes[size],className)} {...props}/>
}
