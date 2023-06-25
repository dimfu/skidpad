import type { NextApiRequest, NextApiResponse } from 'next'
import Fuse from 'fuse.js'
import type { Event } from '@/infrastructure/event'

import fdUs from '@/_data/generated/fd-us.json'
import dmec from '@/_data/generated/dmec.json'
import lzWorldTour from '@/_data/generated/lz-worldtour.json'
import { d1 } from '@/_data'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { search } = req.query

  const _fdUs: Event[] = fdUs as Event[]
  const _dmec: Event[] = dmec as Event[]
  const _lzWorldTour: Event[] = lzWorldTour as Event[]

  const mergeEvents = [..._dmec, ..._fdUs, ..._lzWorldTour, ...d1]

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
