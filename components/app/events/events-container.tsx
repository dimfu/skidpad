import React from 'react'
import { EventItem, EventSkeleton } from './event-item'
import type { Event } from '@/infrastructure/event'
import { useUserContext } from '@/components/shared/providers/user-context'
import { schema } from '@/_data'

interface Props {
  isLoading: boolean
  events: Event[] | undefined
}

export function EventsContainerSkeleton() {
  return (
    <ul className="flex flex-col items-center justify-between mt-[25px] space-y-4 pb-5 w-full lg:w-2/3">
      {Array.from({ length: 8 }).map((_, id) => <EventSkeleton key={id} />)}
    </ul>
  )
}

export default function EventsContainer({ isLoading, events }: Props) {
  const { hidePastEvents } = useUserContext()
  return (
    <ul className="flex flex-col items-center justify-between mt-[25px] space-y-4 pb-5 w-full lg:w-2/3">
      {!isLoading
        ? events?.map(event => (
            <>
              <EventItem
                key={event.url}
                event={event}
                hide={hidePastEvents}
                details={
                  <EventItem.EventDetailsWrapper>
                    <EventItem.Name />
                    <EventItem.Details />
                  </EventItem.EventDetailsWrapper>
                }
                actions={
                  <React.Fragment>
                    <EventItem.Schedule />
                    <EventItem.Link href={event.url}>
                      <span className="font-semibold">Learn More</span>
                    </EventItem.Link>
                  </React.Fragment>
                }
              />

              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema(events)) }} />
            </>
        ))
        : Array.from({ length: 8 }).map((_, id) => <EventSkeleton key={id} />)}
    </ul>
  )
}
