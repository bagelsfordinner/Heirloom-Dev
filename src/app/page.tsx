// src/app/page.tsx
'use client'

import { Box, Heading, Text, VStack } from '@chakra-ui/react'

export default function Home() {
  return (
    <VStack spaceY={6} p={8}>
      <Box bg="surface" p={6} borderRadius="xl">
        <Heading size="xl" color="accent">Heirloom</Heading>
        <Text fontSize="lg" mt={2}>
          A powerful digital GM screen for tabletop RPGs.
        </Text>
      </Box>

      <Box bg="surfaceSecondary" p={6} borderRadius="xl">
        <Text>
          This box uses the <strong>secondary surface</strong> color token.
        </Text>
      </Box>

      <Box bg="surface" p={6} borderRadius="xl">
        <Text>
          This is another softbox using the <strong>main surface</strong>.
        </Text>
      </Box>
    </VStack>
  )
}
