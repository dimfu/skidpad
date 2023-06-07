import type { NextApiRequest, NextApiResponse } from 'next'
import Fuse from 'fuse.js'
import moment from 'moment-timezone'
import { d1, dmec, fdUs, lzWorldTour } from '@/_data'
import type { Event } from '@/infrastructure/event'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { search } = req.query
  const mergeEvents = [...dmec, ...fdUs, ...lzWorldTour, ...d1]

  const sortSoonFirst = mergeEvents.sort((a, b) => {
    const today = moment.utc()
    const dateA = moment.utc(a.schedule.at(-1)?.content.at(-1)?.time.split('–')[1] || a.schedule.at(-1)?.content.at(-1)?.time || a.startDate)
    const dateB = moment.utc(b.schedule.at(-1)?.content.at(-1)?.time.split('–')[1] || b.schedule.at(-1)?.content.at(-1)?.time || b.startDate)

    if (dateA.isBefore(today) && dateB.isBefore(today))
      return dateB.diff(dateA)
    else if (dateA.isBefore(today))
      return 1
    else if (dateB.isBefore(today))
      return -1
    else return dateA.diff(dateB)
  })

  const fuseInstance = new Fuse<Event>(sortSoonFirst, {
    keys: [
      { name: 'name', weight: 1 },
      { name: 'slug', weight: 0.5 },
    ],
  })
  if (search !== undefined) {
    const fusedEvents = fuseInstance.search(search?.toString())
    return res.status(200).json(fusedEvents.map(event => event.item))
  }
  else {
    return res.status(200).json(mergeEvents)
  }
}
