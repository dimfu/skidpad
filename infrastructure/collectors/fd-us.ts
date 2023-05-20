import fs from 'node:fs'
import path from 'node:path'
import * as cheerio from 'cheerio'
import moment from 'moment-timezone'
import 'dotenv/config'
import type { Event } from '../event'

export default async function fdUs() {
  const SOURCE_URL = 'https://www.formulad.com'
  const CURRENT_YEAR = new Date().getFullYear().toString()
  const source = await fetch(`${SOURCE_URL}/schedule`)
  const $ = cheerio.load(await source.text())
  const events: Event[] = await Promise.all($('.event-summary').map(async (_, el) => {
    const location = $(el).find('.location').text()
    const round = $(el).find('.name').text()
    const url = SOURCE_URL + $(el).find('.link > a').attr('href') as string
    const name = `FDUS ${CURRENT_YEAR} - ${round}`

    // Using api-ninjas to get timezone name using city name that provided in link
    // Get your api key here: https://api-ninjas.com/profile
    const getTimezone = await fetch(`https://api.api-ninjas.com/v1/timezone?city=${url.split('/').pop()}`, { headers: { 'X-Api-Key': process.env.API_NINJAS_API_KEY as string } })
    const timezone = (await getTimezone.json()).timezone

    // Fetch the `url` html element to get more detailed event information
    const detailedEvents = await fetch(url)
    const $$ = cheerio.load(await detailedEvents.text())

    let startDate: string

    const schedules = $$('table').map((_, tb) => {
      startDate = $$(tb).prev().text()
      const content = $$(tb).find('tbody > tr').map((_, tr) => {
        const times = $$(tr).find('td:first-child').text().trim() as string
        const program = $$(tr).find('td:last-child').text().trim()
        const formatTime = times.split(' - ').map((time) => {
          return moment.tz(`${startDate} ${time}`, 'dddd, MMMM D, YYYY h:mmA', timezone).toISOString()
        }).join('–')
        return { time: formatTime, program }
      }).get()
      return { started_at: content[0].time, content }
    }).get()

    return {
      slug: 'Formula Drift (US)',
      name,
      location,
      round,
      startDate: schedules[0]?.content[0].time.split('–')[0],
      url,
      schedule: schedules,
    }
  }).get(),
  )

  const removeNoSchedules = events.filter(event => event.schedule.length > 0)

  fs.writeFileSync(path.resolve(__dirname, '../../_data/fd-us.json'), JSON.stringify(removeNoSchedules))
}
