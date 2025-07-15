// src/app/auth/callback/page.tsx
'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleLogin = async () => {
      await supabase.auth.getSession() // Required for client hydration
      router.replace('/dashboard') // or your desired route
    }

    handleLogin()
  }, [router])

  return <p>Logging in...</p>
}
