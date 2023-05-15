import chalk from 'chalk'
import ora from 'ora'

import fdUs from './collectors/fd-us'

function toSecond(hrtime: [number, number]): string {
  return (hrtime[0] + hrtime[1] / 1e9).toFixed(3)
}

(function fetchEvents() {
  const start = process.hrtime()
  const spinner = ora(`${chalk.yellowBright('Fetching all data...')}`).start()

  fdUs().then(() => {
    const end = `${toSecond(process.hrtime(start))} seconds`
    spinner.succeed(`Fetching Formula Drift (USA) done in ${chalk.greenBright(end)}`)
  }).catch(err => chalk.red(err))
})()
