import { usePathname, useRouter } from 'next/navigation'
import type { ReadonlyURLSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import React from 'react'
import { createQueryString } from '@/libs/utils'
import LoadingSpinner from '@/components/shared/icons/loading-spinner/loading-spinner'
import SearchIcon from '@/components/shared/icons/search'

export default function Search({ params, isLoading }: { params: ReadonlyURLSearchParams; isLoading: boolean }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = params?.get('search')
  const ref = React.useRef<HTMLInputElement | null>(null)

  const debounced = useDebouncedCallback((value) => {
    router.push(`${pathname}?${createQueryString(params, 'search', value)}`)
  }, 500)

  const onKeyDown = React.useCallback((event: KeyboardEvent) => {
    const target = event.target as HTMLElement
    if (ref.current && event.key === '/' && target.tagName !== 'INPUT') {
      event.preventDefault()
      ref.current.focus()
      ref.current.selectionEnd = -1
    }
  }, [])

  React.useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return (
    <div className="mt-4 pt-4 border-t border-neutral-600">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4">{isLoading ? <LoadingSpinner /> : <SearchIcon className="text-neutral-400 w-5 h-5" />}</div>
        <input
          placeholder="Type / to search"
          type="text"
          onChange={event => debounced(event.target.value)}
          defaultValue={searchParams?.toString()}
          className="w-full bg-[#1e1e1e] pl-11  pr-4 py-3 rounded outline-none"
          ref={ref}
        />
      </div>
    </div>
  )
}
