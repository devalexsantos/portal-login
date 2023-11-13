'use client'
import { Button } from '@/components/ui/button'
import { auth } from '@/services/firebase'
import { signOut } from 'firebase/auth'
import { LogOut } from 'lucide-react'

export default function Header() {
  const logout = () => {
    signOut(auth)
  }

  return (
    <div className="container flex justify-end py-4">
      <Button
        className="rounded flex gap-2"
        variant="outline"
        onClick={() => logout()}
      >
        <LogOut width={16} height={16} /> Sair
      </Button>
    </div>
  )
}
