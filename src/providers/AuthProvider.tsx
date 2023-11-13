'use client'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/services/firebase'
import { redirect } from 'next/navigation'
import React from 'react'

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, loading] = useAuthState(auth)

  loading && <div>Carregando...</div>
  !user && redirect('/login')

  return <div>{children}</div>
}
