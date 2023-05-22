'use client'
import moment from 'moment-timezone'
import type { ReactNode } from 'react'
import React, { createContext, useContext, useMemo, useState } from 'react'

interface IContext {
  timezone: string
  updateTimezone: (_timezone: string) => void
}

const defaultValues: IContext = {
  timezone: 'Asia/Makassar',
  updateTimezone: (_timezone: string) => {},
}

export const UserContext = createContext<IContext>(defaultValues)
export function useUserContext() {
  return useContext(UserContext)
}

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [timezone, setTimezone] = useState<string>(defaultValues.timezone)

  React.useEffect(() => {
    setTimezone(moment.tz.guess())
  }, [])

  const updateTimezone = React.useCallback((timezone: string) => {
    setTimezone(timezone)
  }, [])

  const value = useMemo(() => {
    return { timezone, updateTimezone }
  }, [timezone, updateTimezone])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
