import EventContext from './context'
import { EventDetails, EventDetailsWrapper, EventName } from './event-details'
import type { Event } from '@/infrastructure/event'

interface Props {
  event: Event
  details: React.ReactNode
}

function EventSkeleton() {
  return (
    <li className="flex items-center justify-between h-[153px] w-[605px] border-b last:border-b-0 border-neutral-600">
      <div className="flex items-start gap-x-4">
        <div className="w-[52px] rounded-[10px] h-[52px] bg-[#1e1e1e] animate-pulse" />
        <div className="self-start">
          <div className="w-56 h-4 rounded-full bg-[#1e1e1e] animate-pulse" />
          <div className="mt-3 space-y-3">
            <div className="w-24 h-2 rounded-full bg-[#1e1e1e] animate-pulse" />
            <div className="w-16 h-2 rounded-full bg-[#1e1e1e] animate-pulse" />
          </div>
        </div>
      </div>
    </li>
  )
}

function EventItem({ event, details }: Props) {
  return (
    <EventContext.Provider value={event}>
      <li className="flex items-center justify-between h-[153px] w-[605px] border-b last:border-b-0 border-neutral-600" key={event.url}>
        {details}
      </li>
    </EventContext.Provider>
  )
}

EventItem.EventDetailsWrapper = EventDetailsWrapper
EventItem.EventName = EventName
EventItem.EventDetails = EventDetails

export { EventItem, EventSkeleton }
