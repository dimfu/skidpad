import Link from 'next/link'
import React from 'react'
import useScheduleModal from './schedule-modal'
import { useEventItemContext } from './context'
import LinkIcon from '@/components/shared/icons/link'
import Clock from '@/components/shared/icons/clock'

interface IEventLink {
  href: string
  children: React.ReactNode
}

export function EventLink({ href, children }: IEventLink) {
  return (
    <Link href={href} target="_blank" className="flex space-x-1 items-center hover:bg-neutral-800 w-fit p-2 rounded transition-all duration-200">
      <LinkIcon className="w-4 h-4" />
      {children}
    </Link>
  )
}

export function EventSchedule() {
  const { ScheduleModal, setShowSchedule } = useScheduleModal()
  const { schedule } = useEventItemContext()

  function onShowSchedule() {
    if (schedule.length === 0)
      return null

    setShowSchedule(true)
  }

  return (
    <React.Fragment>
      <button onClick={onShowSchedule} disabled={schedule.length === 0} className="flex space-x-1 items-center hover:bg-neutral-800 w-fit p-2 rounded transition-all duration-200 disabled:cursor-not-allowed">
        <Clock className="w-4 h-4" />
        <span className="font-semibold">See Schedules {schedule.length === 0 && '(TBA)'}</span>
      </button>
      <ScheduleModal />
    </React.Fragment>
  )
}
