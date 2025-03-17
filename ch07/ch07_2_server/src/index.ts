import { createServer } from 'http'
import { getPublicDirPath } from './config'
import { makeDir } from './utils'

import { createExpressApp } from './express'
import type { MongoDB } from './mongodb'
import { connectAndUseDB } from './mongodb'

makeDir(getPublicDirPath())

const connectCallBack = (db: MongoDB) => {
  const hostname = 'localhost',
    port = 4000

  createServer(createExpressApp()).listen(port, () =>
    console.log(`connect to http://${hostname}:${port}`)
  )
}
connectAndUseDB(connectCallBack, 'ch07')
