// src/components/layout/ProtectedLayout.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useSupabaseUser } from '@/hooks/useSupabaseUser'
import { ReactNode, useEffect } from 'react'
import { Spinner, Flex } from '@chakra-ui/react'

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useSupabaseUser()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner />
      </Flex>
    )
  }

  return <>{user && children}</>
}
