import fs from 'node:fs'
import path from 'node:path'
import * as cheerio from 'cheerio'
import 'dotenv/config'
import moment from 'moment-timezone'

import type { Event } from '../event'

interface LocationList {
  [key: string]: string
}

export default async function lzWorldTour() {
  const SOURCE_URL = 'https://www.lzworldtour.com'
  // const CURRENT_YEAR = new Date().getFullYear().toString()
  const source = await fetch(`${SOURCE_URL}/schedule`)
  const $ = cheerio.load(await source.text())

  const LOCATION_TO_CHANGE: LocationList = {
    Kildare: 'Cill dara',
  }

  const events: Event[] = await Promise.all(
    $('#normal-menu-rkEzMFM0j > li')
      .map(async (_, el) => {
        const url = $(el).find('a').attr('href') as string
        const detailedInfo = await fetch(url)
        const $$ = cheerio.load(await detailedInfo.text())

        const name = `${$$('h1').text()} - LZ World Tour`
        const location = $$('#be-content > div:first-child > div:first-child > div > div > div:first-child > div > div p:eq(0)').text().split(',')[0]
        const getTimezone = await fetch(`https://api.api-ninjas.com/v1/timezone?city=${LOCATION_TO_CHANGE[location] || location}`, {
          headers: { 'X-Api-Key': process.env.API_NINJAS_API_KEY as string },
        })
        const timezone = (await getTimezone.json()).timezone

        const schedules = $$('#event-schedule > div:first-child > div > div > div > div > div:first-child > div > div:last-child .tatsu-column')
          .map((_, el) => {
            const startDate = $$(el).find('.tatsu-column-pad > div:eq(1) p').text()
            const content = $$(el)
              .find('ul > li')
              .map((_, li) => {
                const time = $$(li).find('p').text().split('–')[0].trim() as string
                const program = $$(li).find('p').text().split('–')[1]
                const formatTime = moment.tz(`${startDate} ${time}`, 'dddd, MMMM Do, YYYY h.mma', timezone).toISOString()
                return { time: formatTime, program }
              })
              .get()
            return content.length > 0 ? { started_at: content[0].time, content } : null
          })
          .filter(schedule => schedule !== null)
          .get()

        return { slug: 'LZ World Tour', name, location, round: location, startDate: schedules.length > 0 ? schedules[0].content[0].time : '', url, schedule: schedules }
      })
      .get(),
  )
  const removeNoSchedules = events.filter(event => event.schedule.length > 0)
  fs.writeFileSync(path.resolve(__dirname, '../../_data/lz-worldtour.json'), JSON.stringify(removeNoSchedules))
}
