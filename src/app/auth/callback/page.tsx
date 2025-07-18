// src/app/auth/callback/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Spinner, Flex, Text } from '@chakra-ui/react'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleRedirect = async () => {
      const { error } = await supabase.auth.getSession()

      if (error) {
        console.error('Session error', error)
      }

      router.replace('/campaigns')
    }

    handleRedirect()
  }, [router])

  return (
    <Flex justify="center" align="center" h="100vh" direction="column">
      <Spinner />
      <Text mt={4}>Logging you in...</Text>
    </Flex>
  )
}
