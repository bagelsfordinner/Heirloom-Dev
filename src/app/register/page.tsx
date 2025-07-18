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

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleRegister = async () => {
    setLoading(true)

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (signUpError) {
      toaster.create({
        title: 'Registration failed',
        description: signUpError.message,
        type: 'error',
        duration: 5000,
        closable: true,
      })
      setLoading(false)
      return
    }

    const user = signUpData?.user

    if (user) {
      const { error: profileError } = await supabase.from('users').insert([
        {
          id: user.id,
          username,
        },
      ])

      if (profileError) {
        toaster.create({
          title: 'User profile creation failed',
          description: profileError.message,
          type: 'error',
        })
        setLoading(false)
        return
      }

      toaster.create({
        title: 'Check your email',
        description: 'Please confirm your email to complete registration.',
        type: 'success',
      })

      router.push('/login')
    }

    setLoading(false)
  }

  return (
    <Flex justify="center" align="center" minH="100vh" bg="background">
      <Box maxW="md" w="full" bg="surface" p={8} borderRadius="xl" boxShadow="md">
        <Heading mb={4} color="text" textAlign="center">
          Register
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
            <Field.Label>Username</Field.Label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            onClick={handleRegister}
            loading={loading}
            colorPalette="orange"
            width="full"
          >
            Register
          </Button>

          <Text fontSize="sm" color="text">
            Already have an account?{' '}
            <Link href="/login">
              <Text as="span" color="accent" fontWeight="medium">
                Login
              </Text>
            </Link>
          </Text>
        </VStack>
      </Box>
    </Flex>
  )
}
