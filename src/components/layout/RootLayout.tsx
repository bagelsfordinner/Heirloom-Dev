// src/components/layout/RootLayout.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { system, tokens } from '@/theme/theme'
import { Global, css } from '@emotion/react'

interface Props {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  const globalStyles = css`
    body {
      background-color: ${tokens.colors.background};
      color: ${tokens.colors.text};
    }
  `

  return (
    <html lang="en">
      <body>
        <ChakraProvider value={system}>
          <Global styles={globalStyles} />
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}
