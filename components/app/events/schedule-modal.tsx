import type { SetStateAction } from 'react'
import React from 'react'
import { useEventItemContext } from './context'
import Modal from '@/components/shared/modal'

function ScheduleModal({ showSchedule, setShowSchedule }: { showSchedule: boolean; setShowSchedule: React.Dispatch<SetStateAction<boolean>> }) {
  const { schedule } = useEventItemContext()
  return (
    <Modal showModal={showSchedule} setShowModal={setShowSchedule}>
      <div className="relative max-h-[min(906px,_90vh)] w-full bg-neutral-700">
        <ul>{schedule.map(t => t.content.map(z => <div key={z.time}>{z.time}</div>))}</ul>
      </div>
    </Modal>
  )
}

export default function useScheduleModal() {
  const [showSchedule, setShowSchedule] = React.useState<boolean>(false)
  // useCallback to rerun the useEffect inside ScheduleModal that control the Y height when the open schedule button clicked
  const ShowScheduleModalCallback = React.useCallback(() => {
    return <ScheduleModal setShowSchedule={setShowSchedule} showSchedule={showSchedule} />
  }, [setShowSchedule, showSchedule])

  return React.useMemo(() => ({ setShowSchedule, ScheduleModal: ShowScheduleModalCallback }), [setShowSchedule, ShowScheduleModalCallback])
}
