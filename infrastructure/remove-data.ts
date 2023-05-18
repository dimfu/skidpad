/* eslint-disable no-console */
import fs from 'node:fs'
import path from 'node:path'

const directory = './_data';

(() => {
  fs.readdir(directory, (err, files) => {
    if (err)
      throw err

    files.forEach((file) => {
      if (path.extname(file) === '.json') {
        fs.unlink(path.join(directory, file), (err) => {
          if (err)
            throw err
          console.log(`${file} has been deleted!`)
        })
      }
    })
  })
})()
