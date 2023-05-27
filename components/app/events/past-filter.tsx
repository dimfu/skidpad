import * as Switch from '@radix-ui/react-switch'
import { useUserContext } from '@/components/shared/providers/user-context'

export default function PastFilter() {
  const { hidePastEvents, toggleHideEvents } = useUserContext()
  return (
    <div className="flex items-center justify-between mt-4 py-4 border-t border-t-neutral-600">
      <label className='text-sm text-neutral-400'>Hide past events</label>
      <Switch.Root checked={hidePastEvents} onCheckedChange={toggleHideEvents} className='w-[35px] h-[17px] bg-neutral-600 rounded-full relative data-[state=checked]:bg-green-700 outline-none'>
        <Switch.Thumb className='block w-[16px] h-[17px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]'/>
      </Switch.Root>
    </div>
  )
}
