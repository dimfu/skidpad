'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import clsx from 'clsx'
import { UserContextProvider } from '@/components/shared/providers/user-context'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })

export const metadata = {
  title: 'Skidpad',
  description: 'Drift events calendar around the world',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <UserContextProvider>
        <body className={clsx(inter.variable, 'min-h-screen')}>{children}</body>
      </UserContextProvider>
    </html>
  )
}
