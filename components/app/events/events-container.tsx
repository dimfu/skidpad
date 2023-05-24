import React from 'react'
import moment from 'moment'
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
        ? events
          ?.sort((a, b) => {
            const today = moment()
            const dateA = moment(a.schedule.at(-1)?.content.at(-1)?.time.split('–')[1])
            const dateB = moment(b.schedule.at(-1)?.content.at(-1)?.time.split('–')[1])

            if (dateA.isBefore(today) && dateB.isBefore(today))
              return dateB.diff(dateA)
            else if (dateA.isBefore(today))
              return 1
            else if (dateB.isBefore(today))
              return -1
            else return dateA.diff(dateB)
          })
          ?.map(event => (
              <EventItem
                key={event.url}
                event={event}
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
          ))
        : Array.from({ length: 8 }).map((_, id) => <EventSkeleton key={id} />)}
    </ul>
  )
}
