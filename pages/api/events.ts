import type { NextApiRequest, NextApiResponse } from 'next'
import Fuse from 'fuse.js'
import type { Event } from '@/infrastructure/event'
import { mergeEvents } from '@/_data'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { search } = req.query

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
