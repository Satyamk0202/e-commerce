import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
export const Dialog=DialogPrimitive.Root
export const DialogTrigger=DialogPrimitive.Trigger
export function DialogContent({children,...props}){return <DialogPrimitive.Portal><DialogPrimitive.Overlay className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-sm data-[state=open]:animate-in"/><DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-[81] max-h-[90vh] w-[min(92vw,520px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-white/10 bg-[#1b1d19] p-6 text-white shadow-2xl" {...props}><DialogPrimitive.Close className="absolute right-4 top-4 rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white"><X size={18}/></DialogPrimitive.Close>{children}</DialogPrimitive.Content></DialogPrimitive.Portal>}
