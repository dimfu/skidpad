import Link from 'next/link'
import React from 'react'
import LinkIcon from '@/components/shared/icons/link'
import Clock from '@/components/shared/icons/clock'
import Modal from '@/components/shared/modal'

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
  const [showSchedule, setShowSchedule] = React.useState<boolean>(false)
  return (
    <React.Fragment>
      <button onClick={() => setShowSchedule(true)} className="flex space-x-1 items-center hover:bg-neutral-800 w-fit p-2 rounded transition-all duration-200">
        <Clock className="w-4 h-4" />
        <span className="font-semibold">See Schedules</span>
      </button>
      <Modal showModal={showSchedule} setShowModal={setShowSchedule}>hello world</Modal>
    </React.Fragment>
  )
}
