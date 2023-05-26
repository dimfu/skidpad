import React from 'react'
import clsx from 'clsx'
import moment from 'moment-timezone'
import { useEventItemContext } from './context'
import Calendar from '@/components/shared/icons/calendar'
import Location from '@/components/shared/icons/location'
import { useUserContext } from '@/components/shared/providers/user-context'
import Image from '@/components/shared/image'

export function EventDetailsWrapper({ children }: { children: React.ReactNode }) {
  const { slug, url } = useEventItemContext()
  return (
    <div className="flex items-start gap-x-4">
      <div className="relative w-[52px] rounded-[10px] h-[52px]">
        <Image className='object-cover rounded-full' sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={`https://www.google.com/s2/favicons?sz=64&domain_url=${url}`} alt={slug} fill/>
      </div>
      <div className="self-center">{children}</div>
    </div>
  )
}

export function EventName() {
  const { name, schedule } = useEventItemContext()
  const { timezone } = useUserContext()
  return <h1 className={clsx('font-semibold text-sm md:text-base', moment.utc(schedule.at(-1)?.content.at(-1)?.time.split('–')[1]).tz(timezone).isBefore(moment()) && 'line-through')}>{name}</h1>
}

export function EventDetails() {
  const { location, startDate } = useEventItemContext()
  const { timezone } = useUserContext()
  return (
    <div className="mt-1 flex flex-col md:flex-row md:items-center md:space-x-3">
      <span className="flex items-center space-x-2 text-neutral-400 text-xs">
        <Location className="w-3 h-3" /> <p>{location}</p>
      </span>
      <span className="flex items-center space-x-2 text-neutral-400 text-xs">
        <Calendar className="w-3 h-3" /> <p>{startDate ? moment.utc(startDate).tz(timezone).format('ddd, Do MMM, h:mmA') : 'Coming Soon'}</p>
      </span>
    </div>
  )
}
