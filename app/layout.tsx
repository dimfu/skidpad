import './globals.css'
import { Inter } from 'next/font/google'
import clsx from 'clsx'
import type { Metadata } from 'next'
import Providers from '@/components/shared/providers'

const currentYear = new Date().getFullYear()

export const metadata: Metadata = {
  title: `Upcoming - Drift events Calendar ${currentYear}`,
  description: 'The most comprehensive list of drift events across the world.',
  verification: { google: 'T5NAcAjBEPXTM3ihHp0qjfSbUIJ9Sz9aGqjkGY5ILhY' },
  openGraph: { siteName: 'Skidpad', type: 'website', url: 'https://skidpad.vercel.app/', description: 'The most comprehensive list of drift events across the world', title: 'Drift events calendar around the world - Skidpad' },
}

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={clsx(inter.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
