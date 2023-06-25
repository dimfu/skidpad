import _d1 from './d1.json'

import { Event } from "@/infrastructure/event";
import moment from 'moment-timezone';

export const d1: Event[] = _d1 as Event[]

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
