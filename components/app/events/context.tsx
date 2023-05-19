import { createContext, useContext } from 'react'
import type { Event } from '@/infrastructure/event'

const EventContext = createContext<Event | null>(null)

export function useEventItemContext() {
  const context = useContext(EventContext)
  if (!context)
    throw new Error('EventItem.* component must rendered as a child of EventItem component')
  return context
}

export default EventContext
