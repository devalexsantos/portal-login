'use client'
import { Button } from '@/components/ui/button'
import { auth } from '@/services/firebase'
import { signOut } from 'firebase/auth'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Separator } from '@/components/ui/separator'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

export default function Header() {
  const pathname = usePathname()

  const logout = () => {
    signOut(auth)
  }

  if (pathname === '/login') {
    return
  }

  return (
    <div className="w-full flex justify-end py-2 bg-primary">
      <div className="container flex justify-between gap-6 items-center">
        <Link href="/">
          <span className="text-white font-bold text-xl">Portal Login</span>
        </Link>
        <div className="flex-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-primary text-white">
                  Banners
                </NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-[150px]">
                  <NavigationMenuLink
                    href="/banners-slider"
                    className="flex p-4 text-primary bg-white"
                  >
                    Banner Slider
                  </NavigationMenuLink>
                  <Separator />
                  <NavigationMenuLink
                    href="/banners-individuais"
                    className="flex p-4 text-primary bg-white"
                  >
                    Banner Fixos
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <Button
          className="text-sm rounded flex gap-2"
          variant="outline"
          onClick={() => logout()}
        >
          <LogOut width={12} height={12} /> Sair
        </Button>
      </div>
    </div>
  )
}
