import fs from 'node:fs'
import path from 'node:path'
import * as cheerio from 'cheerio'
import moment from 'moment-timezone'
import 'dotenv/config'
import type { Event } from '../event'

export default async function fdUs() {
  const TITLE = 'Formula Drift USA'
  const SOURCE_URL = 'https://www.formulad.com'

  const source = await fetch(`${SOURCE_URL}/schedule`)
  const $ = cheerio.load(await source.text())
  const events: Event[] = await Promise.all($('.event-summary').map(async (_, el) => {
    const name = `${TITLE} (${$(el).find('.leagues > span').text().replace(/([a-z])([A-Z])/g, '$1, $2')})`
    const location = $(el).find('.location').text()
    const round = $(el).find('.name').text()
    const url = SOURCE_URL + $(el).find('.link > a').attr('href') as string

    // Using api-ninjas to get timezone name using city name that provided in link
    // Get your api key here: https://api-ninjas.com/profile
    const getTimezone = await fetch(`https://api.api-ninjas.com/v1/timezone?city=${url.split('/').pop()}`, { headers: { 'X-Api-Key': process.env.API_NINJAS_API_KEY as string } })
    const timezone = (await getTimezone.json()).timezone

    // Fetch the `url` html element to get more detailed event information
    const detailedEvents = await fetch(url)
    const $$ = cheerio.load(await detailedEvents.text())

    let startDate: string

    const schedules = $$('table').map((_, tb) => {
      // On the website the current date is before the table, so use prev() to get previous element
      startDate = $$(tb).prev().text()
      const content = $$(tb).find('tbody > tr').map((_, tr) => {
        const time = $$(tr).find('td:first-child').text().trim() as string
        const program = $$(tr).find('td:last-child').text().trim()
        return { time, program }
      }).get()
      return { started_at: _.toString(), content }
    }).get()

    // Get the first program time for each day and format to ISO
    const formatStartTimes = schedules.map((schedule) => {
      const firstSchedule = schedule.content[0].time.split('-')[0]
      const formatToIsoString = moment.tz(`${startDate} ${firstSchedule}`, 'dddd, MMMM D, YYYY h:mmA', timezone).toISOString()
      return formatToIsoString
    })

    return {
      name,
      location,
      round,
      // Use the first day first program time
      startDate: formatStartTimes[0],
      url,
      schedule: schedules.map((schedule, index) => {
        return { ...schedule, started_at: formatStartTimes[index] }
      }),
    }
  }).get(),
  )

  fs.writeFileSync(path.resolve(__dirname, '../../_data/fd-us.json'), JSON.stringify(events))
}

fdUs()
