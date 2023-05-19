import { EventItem, EventSkeleton } from './event-item'
import type { Event } from '@/infrastructure/event'

interface Props {
  isLoading: boolean
  events: Event[] | undefined
}

export default function EventsContainer({ isLoading, events }: Props) {
  return (
    <ul className="flex flex-col items-center justify-between mt-[25px] space-y-4 pb-5 w-full lg:w-2/3">
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
              actions={
                <EventItem.EventLink href={event.url}>
                  <span className="font-semibold">Learn More</span>
                </EventItem.EventLink>
              }
            />
        ))
        : Array.from({ length: 8 }).map((_, id) => <EventSkeleton key={id} />)}
    </ul>
  )
}
