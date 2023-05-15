import fs from 'node:fs'
import path from 'node:path'
import * as cheerio from 'cheerio'
import moment from 'moment-timezone'
import 'dotenv/config'
import type { Event } from '../event'

export default async function fdUs() {
  const TITLE = 'Formula Drift USA'
  const SOURCE_URL = 'https://www.formulad.com'
  const CURRENT_YEAR = new Date().getFullYear().toString()

  const source = await fetch(`${SOURCE_URL}/schedule`)
  const $ = cheerio.load(await source.text())
  const events: Event[] = await Promise.all($('.event-summary').map(async (_, el) => {
    const name = `${TITLE} (${$(el).find('.leagues > span').text().replace(/([a-z])([A-Z])/g, '$1, $2')})`
    const location = $(el).find('.location').text()
    const round = $(el).find('.name').text()
    const date = $(el).find('.dates').text() as string
    const url = SOURCE_URL + $(el).find('.link > a').attr('href') as string

    const getTimezone = await fetch(`https://api.api-ninjas.com/v1/timezone?city=${url.split('/').pop()}`, { headers: { 'X-Api-Key': process.env.API_NINJAS_API_KEY as string } })
    const timezone = (await getTimezone.json()).timezone
    const newDate = moment.tz(`${date.split('-')[0]} ${CURRENT_YEAR}`, 'MMM DD YYYY', timezone).startOf('day').toISOString()

    // Scrap detailed info for each event
    const detailedEvents = await fetch(url)
    const $$ = cheerio.load(await detailedEvents.text())

    const schedule = $$('table').map((_, tb) => {
      const content = $$(tb).find('tbody > tr').map((_, tr) => {
        const time = $$(tr).find('td:first-child').text().trim()
        const program = $$(tr).find('td:last-child').text().trim()
        return { time, program }
      }).get()
      return { id: _, content }
    }).get()
    return { name, location, round, startDate: newDate, url, schedule }
  }).get(),
  )

  fs.writeFileSync(path.resolve(__dirname, '../../_data/fd-us.json'), JSON.stringify(events))
}

fdUs()
