import './globals.css'
import { Inter } from 'next/font/google'
import clsx from 'clsx'
import Providers from '@/components/shared/providers'

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
    <html suppressHydrationWarning lang="en">
      <Providers>
        <body className={clsx(inter.variable, 'bg-neutral-950')}>{children}</body>
      </Providers>
    </html>
  )
}
