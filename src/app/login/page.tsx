'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import {
  Box,
  Button,
  Input,
  Field,
  VStack,
  Heading,
  Text,
  Flex,
  IconButton,
} from '@chakra-ui/react'
import { Eye, EyeOff } from 'lucide-react'
import { toaster } from '@/components/ui/toaster'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      toaster.create({
        title: 'Login failed',
        description: error.message,
        type: 'error',
        duration: 5000,
        closable: true,
      })
      setLoading(false)
      return
    }

    router.push('/campaigns')
  }

  return (
    <Flex justify="center" align="center" minH="100vh" bg="background">
      <Box maxW="md" w="full" bg="surface" p={8} borderRadius="xl" boxShadow="md">
        <Heading mb={4} color="text" textAlign="center">
          Login
        </Heading>
        <VStack gap={4}>
          <Field.Root required>
            <Field.Label>Email</Field.Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Password</Field.Label>
            <Box position="relative" w="full">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                pr="3rem"
              />
              <IconButton
  onClick={() => setShowPassword((prev) => !prev)}
  variant="ghost"
  size="sm"
  aria-label="Toggle password visibility"
  position="absolute"
  top="50%"
  right="0.5rem"
  transform="translateY(-50%)"
  bg="transparent"
  _hover={{ bg: 'transparent' }}
  _active={{ bg: 'transparent' }}
  color="accent"
>
  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
</IconButton>

            </Box>
          </Field.Root>

          <Button
            onClick={handleLogin}
            loading={loading}
            colorPalette="orange"
            width="full"
          >
            Login
          </Button>

          <Text fontSize="sm" color="text">
            Don't have an account?{' '}
            <Link href="/register">
              <Text as="span" color="accent" fontWeight="medium">
                Register
              </Text>
            </Link>
          </Text>
        </VStack>
      </Box>
    </Flex>
  )
}
