import './globals.css'
import { Inter } from 'next/font/google'
import clsx from 'clsx'

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
      <body className={clsx(inter.variable, 'min-h-screen')}>{children}</body>
    </html>
  )
}
