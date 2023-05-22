'use client'

import * as Select from '@radix-ui/react-select'
import { getAllTimezones } from 'countries-and-timezones'
import Check from '@/components/shared/icons/check'
import ChevronDown from '@/components/shared/icons/chevron-down'
import Clock from '@/components/shared/icons/clock'
import { useUserContext } from '@/components/shared/providers/user-context'

export function TimezoneSkeleton() {
  return (
    <>
      <h2 className="mb-2 text-sm text-neutral-400">Select Timezone</h2>
      <div className="flex justify-between items-center rounded bg-[#1e1e1e] px-4 py-3 w-full">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-neutral-400" />
          <div className="w-40 h-5 bg-neutral-600 rounded animate-pulse" />
        </div>
      </div>
    </>
  )
}

export default function Timezone() {
  const { timezone, updateTimezone } = useUserContext()
  const timezones = getAllTimezones()
  return (
    <>
      <h2 className="mb-2 text-sm text-neutral-400">Select Timezone</h2>
      <Select.Root defaultValue={timezone} onValueChange={event => updateTimezone(event)}>
        <Select.Trigger className="flex justify-between items-center rounded bg-[#1e1e1e] px-4 py-3 outline-none leading-none w-full">
          <div className="flex items-center space-x-2">
            <Select.Icon>
              <Clock className="w-5 h-5 text-neutral-400" />
            </Select.Icon>
            <Select.Value
              aria-label="timezone"
              placeholder={timezone}
              className="inline-flex items-center justify-center rounded px-[15px] text-sm leading-none text-white shadow-[0_2px_10px] shadow-black/10 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-white outline-none"
            />
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
                {Object.keys(timezones).map((item, id) => (
                  <Select.Item className="rounded cursor-pointer p-2 hover:bg-neutral-700 data-[state=checked]:bg-neutral-700" key={id} value={item}>
                    <Select.ItemText className="text-sm">{item}</Select.ItemText>
                    <Select.ItemIndicator className="absolute right-4 inline-flex items-center justify-center">
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
    </>
  )
}
