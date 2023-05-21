'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import type { Event } from '@/infrastructure/event'

import Wrapper from '@/components/shared/wrapper'
import EventsContainer from '@/components/app/events/events-container'

export default function Home() {
  const { data, isLoading } = useQuery<Event[]>(['events'], () => fetch('/api/events').then(res => res.json()))
  return (
    <Wrapper className='relative'>
      <div className='mt-[75px] px-4 md:px-4 flex flex-col lg:flex-row justify-between w-full mx-auto relative gap-x-[50px]'>
        <section className='lg:sticky top-[100px] self-start p-4'>
          <h1 className='font-semibold text-2xl'>Skidpad</h1>
          <p className='text-neutral-400'>Drift events calendar around the world</p>
        </section>
        <EventsContainer isLoading={isLoading} events={data}/>
      </div>
    </Wrapper>
  )
}
