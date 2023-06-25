'use client'

import * as Select from '@radix-ui/react-select'
import { getAllTimezones } from 'countries-and-timezones'
import moment from 'moment-timezone'
import Check from '@/components/shared/icons/check'
import ChevronDown from '@/components/shared/icons/chevron-down'
import Clock from '@/components/shared/icons/clock'
import { useUserContext } from '@/components/shared/providers/user-context'
import Repeat from '@/components/shared/icons/repeat'

export function TimezoneSkeleton() {
  return (
    <div>
      <h2 className="mb-2 text-sm text-neutral-400">Select Timezone</h2>
      <div className="flex justify-between items-center rounded bg-[#1e1e1e] px-4 py-3 w-full">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-neutral-400" />
          <div className="w-40 h-5 bg-neutral-600 rounded animate-pulse" />
        </div>
      </div>
    </div >
  )
}

export default function Timezone() {
  const { timezone, updateTimezone } = useUserContext()
  const timezones = getAllTimezones()

  const scrubbedPrefixes = [
    'Antarctica',
    'Arctic',
    'Canada',
    'Chile',
    'Etc',
    'Mexico',
    'US',
  ]

  const timezoneKeys = Object.keys(timezones).filter(name => name.includes('/')).filter(name => !scrubbedPrefixes.includes(name.split('/')[0]))
  const timezoneItems = timezoneKeys.reduce((memo: { name: string; offset: number; offsetString: string }[], tz) => {
    memo.push({
      name: tz,
      offset: timezones[tz as keyof typeof timezones].utcOffset,
      offsetString: timezones[tz as keyof typeof timezones].utcOffsetStr,
    })
    return memo
  }, []).sort((a, b) => a.offset - b.offset)

  function resetTimezone() {
    updateTimezone(moment.tz.guess())
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm text-neutral-400">Select Timezone</h2>
        <div onClick={resetTimezone} className='flex items-center space-x-1 group text-sm text-neutral-400 cursor-pointer'>
          <Repeat className='w-4 h-4' />
          <span className='group-hover:underline'>Reset</span>
        </div>
      </div>
      <Select.Root value={timezone} onValueChange={event => updateTimezone(event)}>
        <Select.Trigger className="flex flex-shrink justify-between items-center rounded text-left bg-[#1e1e1e] px-4 py-3 outline-none leading-none w-full">
          <div className="flex items-center space-x-2 overflow-hidden">
            <Select.Icon>
              <Clock className="w-5 h-5 text-neutral-400" />
            </Select.Icon>
            <div className='whitespace-nowrap overflow-hidden text-ellipsis'>
              <Select.Value aria-label="timezone" placeholder={timezone} />
            </div>
          </div>
          <Select.Icon>
            <ChevronDown className="w-5 h-5 text-neutral-400" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content position="popper" className="overflow-hidden mt-1 bg-[#1e1e1e] rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
            <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-[#1e1e1e] cursor-default">
              <ChevronDown className="transform rotate-180" />
            </Select.ScrollUpButton>
            <Select.Viewport className="p-[5px] max-h-48">
              <Select.Group className="p-1 flex flex-col space-y-1">
                {timezoneItems.map((item, id) => (
                  <Select.Item className="rounded cursor-pointer p-2 hover:bg-neutral-700 data-[state=checked]:bg-neutral-700" key={id} value={item.name}>
                    <Select.ItemText><span className='text-sm truncate block'>(GMT{item.offsetString}) {item.name.replace('_', ' ')}</span></Select.ItemText>
                    <Select.ItemIndicator className="absolute right-4 inline-flex self-center justify-center">
                      <Check className="w-5 h-5 text-neutral-400" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Viewport>
            <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-[#1e1e1e] cursor-default">
              <ChevronDown />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}
