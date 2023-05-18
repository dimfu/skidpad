import type { NextApiRequest, NextApiResponse } from 'next'
import { dmec, fdUs } from '@/_data'

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json([...dmec, ...fdUs])
}
