import { EventItem, EventSkeleton } from './event-item'
import type { Event } from '@/infrastructure/event'

interface Props {
  isLoading: boolean
  events: Event[] | undefined
}

export default function EventsContainer({ isLoading, events }: Props) {
  return (
    <ul className="flex flex-col items-center justify-between w-auto mt-[50px] lg:mt-[-20px] pb-5">
      {!isLoading
        ? events?.map(event => (
            <EventItem
              key={event.url}
              event={event}
              details={
                <EventItem.EventDetailsWrapper>
                  <EventItem.EventName />
                  <EventItem.EventDetails />
                </EventItem.EventDetailsWrapper>
              }
            />
        ))
        : Array.from({ length: 8 }).map((_, id) => <EventSkeleton key={id} />)}
    </ul>
  )
}
