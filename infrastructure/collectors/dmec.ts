import fs from 'node:fs'
import path from 'node:path'
import * as cheerio from 'cheerio'
import 'dotenv/config'
import moment from 'moment-timezone'
import type { Event } from '../event'

interface LocationList {
  [key: string]: string
}

export default async function dmec() {
  const SOURCE_URL = 'https://www.driftmasters.gp/events/dmec'
  const TOTAL_ROUND = 6
  const CURRENT_YEAR = new Date().getFullYear().toString()

  // Couldn't think of better idea instead of using this to change location name
  const LOCATION_TO_CHANGE: LocationList = {
    'Co. Kildare': 'Cill dara',
  }

  const promises: Promise<Event>[] = []

  for (let i = 1; i <= TOTAL_ROUND; i++) {
    const newUrl = `${SOURCE_URL}/round-${i}`
    promises.push(new Promise((resolve, reject) => {
      fetch(newUrl).then(source => source.text()).then(async (html) => {
        const $ = cheerio.load(html)
        const name = $('article.header > h3').text().trim()

        // Exclude events from previous year
        if (!name.includes(CURRENT_YEAR))
          resolve({} as Event)

        const eventParagraph = $('article.content > p > strong:contains("Venue:")').parent().text()

        const locationStart = eventParagraph.indexOf('Venue:') + 'Venue:'.length
        const locationEnd = eventParagraph.indexOf('Dates:')
        const location = eventParagraph.substring(locationStart, locationEnd).trim().split(',')[1].trimStart()

        const getTimezone = await fetch(`https://api.api-ninjas.com/v1/timezone?city=${LOCATION_TO_CHANGE[location] || location}`, { headers: { 'X-Api-Key': process.env.API_NINJAS_API_KEY as string } })
        const timezone = (await getTimezone.json()).timezone

        const round = `Round ${i}: ${location.split(',')[0].trim()}`

        let startDate: string

        const schedules = $('table:eq(1), table:eq(2)').map((_, tb) => {
          startDate = $(tb).find('tr:first-child > th').text().trim().split('–')[0].trim()
          const content = $(tb).find('tbody > tr').map((_, tr) => {
            const times = $(tr).find('td:first-child').text().trim() as string
            const program = $(tr).find('td:last-child').text().trim()
            const formatTime = times.split(' – ').map((time) => {
              return moment.tz(`${startDate} ${time}`, 'dddd, Do MMMM YYYY HH.mm', timezone).toISOString()
            }).join('–')
            return { time: formatTime, program }
          }).get()
          return { started_at: content[0].time, content }
        }).get()

        resolve({
          slug: 'Drift Masters EU',
          name,
          location,
          round,
          startDate: schedules[0].content[0].time.split('–')[0],
          url: newUrl,
          schedule: schedules,
          timezone,
        })
      }).catch(err => reject(err))
    }))
  }

  try {
    // Filter because if events not yet announched it will return undefined
    const results = (await Promise.all(promises)).filter(item => Object.keys(item).length > 0)
    fs.writeFileSync(path.resolve(__dirname, '../../_data/dmec.json'), JSON.stringify(results))
  }
  catch (err) {
    throw new Error(err as string)
  }
}
