'use client'

import React from 'react'
import { UserContextProvider } from './user-context'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserContextProvider>
      {children}
    </UserContextProvider>
  )
}
