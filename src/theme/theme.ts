// src/theme/theme.ts
import { createSystem, defaultConfig } from '@chakra-ui/react'

export const tokens = {
  colors: {
    background: '#1a1e1c',
    surface: '#242a27',
    surfaceSecondary: '#2D3B36',
    text: '#F5F5F5',
    accent: '#B85128',
  },
}

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        background: { value: tokens.colors.background },
        surface: { value: tokens.colors.surface },
        surfaceSecondary: { value: tokens.colors.surfaceSecondary },
        text: { value: tokens.colors.text },
        accent: { value: tokens.colors.accent },
      },
    },
  },
})
