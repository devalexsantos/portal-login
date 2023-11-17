'use client'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()

  if (pathname === '/login') {
    return
  }

  return (
    <div className="w-full py-3 bg-[#e3e3e3]">
      <div className="container flex justify-center items-center">
        <span className="text-sm text-center text-zinc-600">
          <span className="font-bold text-primary">Portal Login@ v1.0.0</span> -
          Login Informática - Qualquer problema procure o Alex.
        </span>
      </div>
    </div>
  )
}
