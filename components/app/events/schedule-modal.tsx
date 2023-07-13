import type { SetStateAction } from 'react'
import React from 'react'
import moment from 'moment-timezone'
import clsx from 'clsx'

// import { googleCalendarEventUrl } from 'google-calendar-url'
import { useEventItemContext } from './context'
import Modal from '@/components/shared/modal'
import { useUserContext } from '@/components/shared/providers/user-context'
import Circle from '@/components/shared/icons/circle'
import CheckFill from '@/components/shared/icons/check-fill'
import Record from '@/components/shared/icons/record'

function ScheduleModal({ showSchedule, setShowSchedule }: { showSchedule: boolean; setShowSchedule: React.Dispatch<SetStateAction<boolean>> }) {
  const { schedule, name, location, slug, url } = useEventItemContext()
  const { timezone } = useUserContext()
  return (
    <Modal showModal={showSchedule} setShowModal={setShowSchedule}>
      <div className="relative max-h-[min(906px,_90vh)] shadow-xl md:max-w-screen-sm w-full bg-neutral-800 overflow-auto md:rounded-2xl md:border md:border-neutral-600">
        <div className="px-4 pb-4 md:pt-4 border-b border-neutral-700">
          <h5 className="font-semibold text-xl text-white">Schedule</h5>
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
                    {s.content.map((c, id) => {
                      let IconIndicator, lastProgramTime
                      const nextProgram = s.content[id + 1]
                      const firstProgramTime = moment.utc(c.time.split('–')[0]).tz(timezone)

                      if (c.time && c.time.includes('–'))
                        lastProgramTime = moment.utc(c.time.split('–')[1]).tz(timezone)
                      else if (nextProgram && nextProgram.time)
                        lastProgramTime = moment.utc(nextProgram.time.split('–')[0]).tz(timezone)
                      else lastProgramTime = firstProgramTime.endOf('day')

                      const now = moment.utc().tz(timezone)
                      const isProgramBeforeToday = lastProgramTime.tz(timezone).isBefore(now)
                      const isCurrentProgram = now.isBetween(firstProgramTime, lastProgramTime)

                      const iconIndicatorClass = 'absolute z-10 left-[calc((40px)*-1-9px)] top-0'

                      if (isCurrentProgram)
                        IconIndicator = <Record className={clsx(iconIndicatorClass, 'text-green-500 w-6 h-6 animate-pulse')} />
                      else if (isProgramBeforeToday)
                        IconIndicator = <CheckFill className={clsx(iconIndicatorClass, 'text-white w-6 h-6')} />
                      else IconIndicator = <Circle className={clsx(iconIndicatorClass, 'text-neutral-400')} />

                      return (
                        <li className="relative my-auto border-b border-b-neutral-700 pb-2" key={c.time + id}>
                          <div>
                            {id + 1 !== s.content.length && (
                              <div
                                className={clsx(
                                  'absolute -left-[38px] top-[23px] -bottom-[23px] w-[1px]',
                                  isCurrentProgram ? 'bg-neutral-500' : isProgramBeforeToday ? 'bg-neutral-50' : 'bg-neutral-500',
                                )}
                              />
                            )}
                            {IconIndicator}
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className={clsx('text-white text-sm', isProgramBeforeToday && 'line-through')}>{c.program}</p>
                              <span className="text-neutral-400 text-sm">
                                {c.time
                                  .split('–')
                                  .map(t => moment.utc(t).tz(timezone).format('h:mmA'))
                                  .join(' - ')}
                              </span>
                            </div>
                            {/* <Link
                              target="_blank"
                              href={googleCalendarEventUrl({
                                title: `${slug} - ${c.program}`,
                                details: `${name} - more details: ${url}`,
                                location,
                                start: moment.utc(c.time.split('–')[0]).format('YYYYMMDD[T]HHmmss[Z]'),
                                end: c.time.includes('–') ? moment.utc(c.time.split('–')[1]).format('YYYYMMDD[T]HHmmss[Z]') : lastProgramTime.utc().format('YYYYMMDD[T]HHmmss[Z]'),
                              })}
                            >
                              <span className="hover:underline duration-200 transition-all">Add to calendar</span>
                            </Link> */}
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
          </div>
        </div>
        <div className="p-4">
          <button onClick={() => setShowSchedule(false)} className="p-3 bg-white rounded-xl w-full text-neutral-900 font-bold text-lg">
            Close
          </button>
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
