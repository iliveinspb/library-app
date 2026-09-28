import fs from 'fs'
import os from 'os'
import path from 'path'
import type { NextFunction, Request, Response } from 'express'

const logPath = path.join(__dirname, '../server.log')

const logger = (_req: Request, _res: Response, next: NextFunction): void => {
  console.log('logger работает')
  const now = Date.now()
  const { url, method } = _req

  const data = `${now}: вызван ${method} по ${url}`

  console.log(data)

  fs.appendFile(logPath, data + os.EOL, (err) => {
    if (err) {
      console.log(err)
    }
  })

  next()
}

export default logger
