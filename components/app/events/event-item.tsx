import moment from 'moment-timezone'
import clsx from 'clsx'
import EventContext from './context'
import { EventDetails, EventDetailsWrapper, EventName } from './event-details'
import { EventLink, EventSchedule } from './event-actions'
import type { Event } from '@/infrastructure/event'
import { useUserContext } from '@/components/shared/providers/user-context'

interface Props {
  event: Event
  hide: boolean
  details: React.ReactNode
  actions: React.ReactNode
}

function EventSkeleton() {
  return (
    <li className="h-[147px] w-full flex flex-col justify-between rounded-lg border border-neutral-700 bg-neutral-900">
      <div className="p-5 flex items-center justify-between w-full">
        <div className="flex items-start gap-x-4">
          <div className="w-[52px] rounded-[10px] h-[52px] bg-[#1e1e1e] animate-pulse" />
          <div className="self-start">
            <div className="w-56 h-4 rounded-full bg-[#1e1e1e] animate-pulse" />
            <div className="flex mt-3 space-x-4">
              <div className="w-24 h-2 rounded-full bg-[#1e1e1e] animate-pulse" />
              <div className="w-16 h-2 rounded-full bg-[#1e1e1e] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 py-2 flex space-x-2 items-center h-[53px] border-inherit border-t w-full text-neutral-400 text-sm">
        <div className='w-[112px] h-9 py-2 bg-[#1e1e1e] animate-pulse rounded'/>
        <div className='w-[112px] h-9 py-2 bg-[#1e1e1e] animate-pulse rounded'/>
      </div>
    </li>
  )
}

function EventItem({ event, details, actions, hide }: Props) {
  const { timezone } = useUserContext()
  const isPastEvent = hide && moment.utc(event.schedule.at(-1)?.content.at(-1)?.time.split('–')[1] || event.schedule.at(-1)?.content.at(-1)?.time || event.startDate).tz(timezone).isBefore(moment())
  return (
    <EventContext.Provider value={event}>
      <li className={clsx('relative w-full rounded-lg border border-neutral-700 bg-neutral-900 shadow', isPastEvent ? 'hidden' : 'block')} key={event.url}>
        <div className="p-5 flex items-center justify-between">{details}</div>
        <div className="flex items-center space-x-2 px-5 py-2 border-inherit border-t w-full text-neutral-400 text-sm">{actions}</div>
      </li>
    </EventContext.Provider>
  )
}

EventItem.EventDetailsWrapper = EventDetailsWrapper
EventItem.Name = EventName
EventItem.Details = EventDetails
EventItem.Link = EventLink
EventItem.Schedule = EventSchedule

export { EventItem, EventSkeleton }
