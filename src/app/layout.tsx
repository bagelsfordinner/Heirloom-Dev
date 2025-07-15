// src/app/layout.tsx
import '@/styles/globals.css'
import RootLayout from '@/components/layout/RootLayout'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Heirloom',
  description: 'Your digital GM screen',
}

export default function Layout({ children }: { children: ReactNode }) {
  return <RootLayout>{children}</RootLayout>
}
