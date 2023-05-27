'use client'
import moment from 'moment-timezone'
import type { ReactNode } from 'react'
import React, { createContext, useContext, useMemo, useState } from 'react'

interface IContext {
  timezone: string
  hidePastEvents: boolean
  updateTimezone: (_timezone: string) => void
  toggleHideEvents: () => void
}

const defaultValues: IContext = {
  timezone: 'Asia/Makassar',
  hidePastEvents: false,
  updateTimezone: (_timezone: string) => {},
  toggleHideEvents: () => {},
}

export const UserContext = createContext<IContext>(defaultValues)
export function useUserContext() {
  return useContext(UserContext)
}

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [timezone, setTimezone] = useState<string>(defaultValues.timezone)
  const [hidePastEvents, setHidePastEvents] = useState<boolean>(defaultValues.hidePastEvents)

  React.useEffect(() => {
    const savedTimezone = localStorage.getItem('timezone')
    const savedHideEvents = localStorage.getItem('isPastHidden')

    if (savedTimezone)
      setTimezone(savedTimezone)
    else
      setTimezone(moment.tz.guess())

    if (savedHideEvents)
      setHidePastEvents(JSON.parse(savedHideEvents))
  }, [])

  const updateTimezone = React.useCallback((timezone: string) => {
    localStorage.setItem('timezone', timezone)
    setTimezone(timezone)
  }, [])

  const toggleHideEvents = React.useCallback(() => {
    setHidePastEvents((state) => {
      localStorage.setItem('isPastHidden', JSON.stringify(!state))
      return !state
    })
  }, [])

  const value = useMemo(() => {
    return { timezone, updateTimezone, hidePastEvents, toggleHideEvents }
  }, [timezone, updateTimezone, hidePastEvents, toggleHideEvents])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
