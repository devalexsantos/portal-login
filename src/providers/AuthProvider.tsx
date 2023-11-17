'use client'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/services/firebase'
import { redirect } from 'next/navigation'
import React from 'react'
import LoadSpinner from '@/components/Loading'

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, loading] = useAuthState(auth)

  if (loading) {
    return <LoadSpinner />
  }

  if (!user) {
    redirect('/login')
  }

  return <div>{children}</div>
}
