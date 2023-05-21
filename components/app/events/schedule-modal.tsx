import type { SetStateAction } from 'react'
import React from 'react'
import moment from 'moment-timezone'
import { useEventItemContext } from './context'
import Modal from '@/components/shared/modal'
import { useUserContext } from '@/components/shared/providers/user-context'
import Circle from '@/components/shared/icons/circle'

function ScheduleModal({ showSchedule, setShowSchedule }: { showSchedule: boolean; setShowSchedule: React.Dispatch<SetStateAction<boolean>> }) {
  const { schedule } = useEventItemContext()
  const { timezone } = useUserContext()
  return (
    <Modal showModal={showSchedule} setShowModal={setShowSchedule}>
      <div className="relative max-h-[min(906px,_90vh)] shadow-xl md:max-w-screen-sm w-full bg-neutral-800 overflow-auto md:rounded-2xl md:border md:border-neutral-600">
        <div className="px-4 pb-4 md:pt-4 border-b border-neutral-700">
          <h1 className="font-semibold text-xl text-white">Schedule</h1>
          <span>{schedule.length} day(s) event</span>
        </div>
        <div className="px-4 relative min-h-[calc(4.2rem*2)]">
          <div className="relative flex w-full flex-col">
            {schedule
              .sort((a, b) => new Date(a.started_at).getDate() - new Date(b.started_at).getDate())
              .map(s => (
                <div className="py-8" key={s.started_at}>
                  <div className="relative mb-8 inline-block text-lg font-semibold">{moment.utc(s.started_at.split('–')[0]).tz(timezone).format('dddd')}</div>
                  <ul className="flex flex-col gap-y-[20px] pl-14">
                    {s.content.map((c, id) => (
                      <li className="relative my-auto" key={c.program}>
                        <div>
                          {id + 1 !== s.content.length && <div className="absolute -left-[38px] top-[23px] -bottom-[23px] w-[1px] bg-neutral-500" />}
                          <Circle className="absolute z-10 left-[calc((40px)*-1-9px)] top-0 text-neutral-500" />
                        </div>
                        <div>
                          <p className="text-white text-sm">{c.program}</p>
                          <span className="text-neutral-400 text-sm">
                            {c.time
                              .split('–')
                              .map(t => moment.utc(t).tz(timezone).format('h:mmA'))
                              .join(' - ')}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
        <div className="p-4">
          <button onClick={() => setShowSchedule(false)} className="p-3 bg-white rounded-xl w-full text-neutral-900 font-bold text-lg">Close</button>
        </div>
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
