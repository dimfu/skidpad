import './globals.css'
import { Inter } from 'next/font/google'
import clsx from 'clsx'
import type { Metadata } from 'next'
import Providers from '@/components/shared/providers'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })
const currentYear = new Date().getFullYear()

export const metadata: Metadata = {
  title: `Upcoming - Drift events Calendar ${currentYear}`,
  description: 'The most comprehensive list of drift events across the world.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <Providers>
        <body className={clsx(inter.variable)}>{children}</body>
      </Providers>
    </html>
  )
}
