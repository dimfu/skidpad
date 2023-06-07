import React from 'react'

import dynamic from 'next/dynamic'
import type { Event } from '@/infrastructure/event'
import { schema } from '@/_data'

const Events = dynamic(() => import('@/components/app/events'), {
  loading: () => null,
  ssr: false,
})

async function getEventsData() {
  try {
    const apiUrl = process.env.NODE_ENV === 'production' ? 'https://skidpad.vercel.app/api/events' : 'http://localhost:3000/api/events'

    const response = await fetch(apiUrl)
    const json = await response.json()
    return json as Event[]
  }
  catch {}
}

export default async function Home() {
  const events = await getEventsData()
  return (
    <>
      <Events events={events} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema(events)) }} />
    </>
  )
}
