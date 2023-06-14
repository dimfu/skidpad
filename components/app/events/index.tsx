'use client'
import React from 'react'
import dynamic from 'next/dynamic'

import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import Wrapper from '@/components/shared/wrapper'
import { TimezoneSkeleton } from '@/components/app/events/timezone'
import type { Event } from '@/infrastructure/event'
import { EventsContainerSkeleton } from '@/components/app/events/events-container'
import { SearchSkeleton } from '@/components/app/events/search'

const Timezone = dynamic(() => import('@/components/app/events/timezone'), {
  loading: () => <TimezoneSkeleton />,
  ssr: false,
})

const Search = dynamic(() => import('@/components/app/events/search'), {
  loading: () => <SearchSkeleton />,
  ssr: false,
})

const PastFilter = dynamic(() => import('@/components/app/events/past-filter'), {
  loading: () => (
    <div className="flex items-center justify-between mt-4 py-4 border-t border-t-neutral-600">
      <label className="text-sm text-neutral-400">Hide past events</label>
    </div>
  ),
  ssr: false,
})

const EventsContainer = dynamic(() => import('@/components/app/events/events-container'), {
  loading: () => <EventsContainerSkeleton />,
  ssr: false,
})

export default function Events({ events }: { events: Event[] | undefined }) {
  const params = useSearchParams()!
  const { data, isLoading } = useQuery<Event[]>(['events', params.toString()], () => fetch(`/api/events?${params.toString()}`).then(res => res.json()), { initialData: events })

  return (
    <Wrapper className="relative">
      <div className="mt-[75px] px-4 md:px-4 flex flex-col lg:flex-row justify-between w-full mx-auto relative gap-x-[50px]">
        <section className="w-full lg:w-[280px] lg:sticky top-[100px] self-start">
          <h1 className="font-semibold text-2xl">Skidpad</h1>
          <h2 className="text-neutral-400">The most comprehensive list of drift events across the world.</h2>
          <div className="relative py-4 my-4 w-full border-t border-t-neutral-600">
            <Timezone />
            <Search isLoading={isLoading} params={params} />
            <PastFilter />
          </div>
        </section>
        <EventsContainer isLoading={isLoading} events={data} />
      </div>
    </Wrapper>
  )
}
