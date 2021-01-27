import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as express from 'express'
import * as http from 'http'
import * as responseTime from 'response-time'

import errorHandler from '../middlewares/errorHandler'
import notFound from '../middlewares/notFound'
import routes from '../routes/index'

class Api {
  public app: express.Application
  public server: http.Server

  public constructor () {
    this.app = express()
    this.server = http.createServer(this.app)

    this.app.use(bodyParser.json({ limit: '50mb' }))
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(cors())
    this.app.use(responseTime('dev'))

    this.app.use(routes)

    this.app.use(notFound)
    this.app.use(errorHandler)
  }
}

export default new Api()
