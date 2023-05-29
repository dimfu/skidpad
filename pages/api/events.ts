import type { NextApiRequest, NextApiResponse } from 'next'
import Fuse from 'fuse.js'
import { d1, dmec, fdUs, lzWorldTour } from '@/_data'
import type { Event } from '@/infrastructure/event'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { search } = req.query
  const mergeEvents = [...dmec, ...fdUs, ...lzWorldTour, ...d1]
  const fuseInstance = new Fuse<Event>(mergeEvents, {
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
