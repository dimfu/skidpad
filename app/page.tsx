'use client'
import React from 'react'
import type { Event } from '@/infrastructure/event'

import { dmec, fdUs } from '@/_data'

export default function Home() {
  const data: Event[] = [...dmec, ...fdUs]
  return (
    <ul className="flex min-h-screen flex-col items-center justify-between p-24">
      {data?.map((item, id) => (
        <li key={id}>{item.name}</li>
      ))}
    </ul>
  )
}
