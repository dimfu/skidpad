import moment from 'moment-timezone'
import React from 'react'
import { useEventItemContext } from './context'
import Calendar from '@/components/shared/icons/calendar'
import Location from '@/components/shared/icons/location'
import { useUserContext } from '@/components/shared/providers/user-context'

export function EventDetailsWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-x-4">
      <div className="w-[52px] rounded-[10px] h-[52px] bg-[#1e1e1e]" />
      <div className="self-start">{children}</div>
    </div>
  )
}

export function EventName() {
  const { name } = useEventItemContext()
  return <h1 className="font-semibold">{name}</h1>
}

export function EventDetails() {
  const { location, startDate } = useEventItemContext()
  const { timezone } = useUserContext()
  return (
    <div className="mt-1 space-y-1">
      <span className="flex items-center space-x-2 text-neutral-400 text-xs">
        <Location className="w-3 h-3" /> <p>{location}</p>
      </span>
      <span className="flex items-center space-x-2 text-neutral-400 text-xs">
        <Calendar className="w-3 h-3" /> <p>{startDate ? moment.utc(startDate).tz(timezone).format('ddd, Do MMM, h:mmA') : 'Coming Soon'}</p>
      </span>
    </div>
  )
}
