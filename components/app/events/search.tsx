import { usePathname, useRouter } from 'next/navigation'
import type { ReadonlyURLSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import React from 'react'
import { createQueryString } from '@/libs/utils'

export default function Search({ params }: { params: ReadonlyURLSearchParams }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = params?.get('search')
  const ref = React.useRef<HTMLInputElement | null>(null)

  const debounced = useDebouncedCallback((value) => {
    router.push(`${pathname}?${createQueryString(params, 'search', value)}`)
  }, 500)

  return (
    <div className="relative mt-2">
      <input placeholder="Search events" onChange={event => debounced(event.target.value)} defaultValue={searchParams?.toString()} className="w-full bg-[#1e1e1e] px-4 py-3 rounded outline-none" ref={ref} />
    </div>
  )
}
