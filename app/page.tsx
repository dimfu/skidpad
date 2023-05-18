'use client'
import React from 'react'
import moment from 'moment-timezone'
import { useQuery } from '@tanstack/react-query'
import type { Event } from '@/infrastructure/event'

import Wrapper from '@/components/shared/wrapper'
import Location from '@/components/shared/icons/location'
import Calendar from '@/components/shared/icons/calendar'
import { useUserContext } from '@/components/shared/providers/user-context'

export default function Home() {
  const { data, isLoading } = useQuery<Event[]>(['events'], () => fetch('/api/events').then(res => res.json()))
  const { timezone } = useUserContext()
  return (
    <Wrapper>
      <div className='mt-[75px] flex flex-col lg:flex-row justify-between lg:w-full mx-auto relative gap-x-[50px]'>
        <section className='lg:sticky top-[100px] self-start w-[323px]'>
          <h1 className='font-semibold text-2xl'>Skidpad</h1>
          <p className='font-medium text-neutral-400'>Drift events calendar around the world</p>
        </section>
        <ul className="flex flex-col items-center justify-between w-auto mt-[50px] lg:mt-[-20px] pb-5">
          {!isLoading
            ? data?.map((item, id) => (
            <li className='flex items-center justify-between h-[153px] w-[605px] border-b border-neutral-600' key={id}>
              <div className='flex items-start gap-x-4'>
                <div className='w-[52px] rounded-[10px] h-[52px] bg-[#1e1e1e]'/>
                <div className='self-start'>
                  <h1 className='font-semibold'>{item.name}</h1>
                  <div className='mt-1 space-y-1'>
                    <span className='flex items-center space-x-2 text-neutral-400 text-xs'><Location className='w-3 h-3'/> <p>{item.location}</p></span>
                    <span className='flex items-center space-x-2 text-neutral-400 text-xs'><Calendar className='w-3 h-3'/> <p>{moment.utc(item.startDate).tz(timezone).format('ddd, Do MMM, h:mmA') || 'Coming Soon'}</p></span>
                  </div>
                </div>
              </div>
            </li>
            ))
            : Array.from({ length: 8 }).map((_, id) => (
              <li className='flex items-center justify-between h-[153px] w-[605px] border-b border-neutral-600' key={id}>
              <div className='flex items-start gap-x-4'>
                <div className='w-[52px] rounded-[10px] h-[52px] bg-[#1e1e1e] animate-pulse'/>
                <div className='self-start'>
                  <div className='w-56 h-4 rounded-full bg-[#1e1e1e] animate-pulse'/>
                  <div className='mt-1 space-y-1'>
                    <div className='w-24 h-3 rounded-full bg-[#1e1e1e] animate-pulse'/>
                    <div className='w-16 h-3 rounded-full bg-[#1e1e1e] animate-pulse'/>
                  </div>
                </div>
              </div>
            </li>
            ))}
        </ul>
      </div>
    </Wrapper>
  )
}
