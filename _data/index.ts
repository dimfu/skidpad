import _fdUs from './fd-us.json'
import _dmec from './dmec.json'
import _lzWorldTour from './lz-worldtour.json'
import _d1 from './d1.json'

import { Event } from "@/infrastructure/event";
import moment from 'moment-timezone';
import type { Event as EventSchema } from 'schema-dts'

export const fdUs: Event[] = _fdUs as Event[]
export const dmec: Event[] = _dmec as Event[]
export const lzWorldTour: Event[] = _lzWorldTour as Event[]
export const d1: Event[] = _d1 as Event[]

const mergeEvents = [...dmec, ...fdUs, ...lzWorldTour, ...d1]

export const sortSoonFirst = mergeEvents.sort((a, b) => {
  const today = moment.utc()
  const dateA = moment.utc(a.schedule.at(-1)?.content.at(-1)?.time.split('–')[1] || a.schedule.at(-1)?.content.at(-1)?.time || a.startDate)
  const dateB = moment.utc(b.schedule.at(-1)?.content.at(-1)?.time.split('–')[1] || b.schedule.at(-1)?.content.at(-1)?.time || b.startDate)

  if (dateA.isBefore(today) && dateB.isBefore(today))
    return dateB.diff(dateA)
  else if (dateA.isBefore(today))
    return 1
  else if (dateB.isBefore(today))
    return -1
  else return dateA.diff(dateB)
})

export const schema = (events: Event[] | undefined) => {
  if (!events)
    return undefined

  return events.map((event) => {
    return {
      "@context": "http://schema.org",
      "@type": "Event",
      name: event.name,
      description: event.slug,
      url: event.url,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      startDate: moment.utc(event.startDate).tz(event.timezone)?.toISOString(),
      endDate: event.schedule.at(-1)?.content.at(-1)?.time.includes('–') ? moment.utc(event.schedule.at(-1)?.content.at(-1)?.time.split('–')[1]).tz(event.timezone)?.toISOString() : moment.utc(event.startDate).tz(event.timezone)?.endOf('day')?.toISOString(),
      location: {
        "@type": 'Place',
        name: event.location
      }
    }
  })
} 
