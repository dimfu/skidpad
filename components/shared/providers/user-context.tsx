'use client'
import moment from 'moment-timezone'
import type { ReactNode } from 'react'
import React, { createContext, useContext, useMemo, useState } from 'react'

interface IContext {
  timezone: string
}

const defaultValues: IContext = {
  timezone: 'Asia/Makassar',
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

  const value = useMemo(() => {
    return { timezone }
  }, [timezone])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
