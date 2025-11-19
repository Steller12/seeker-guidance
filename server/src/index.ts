import cors from 'cors'
import express from 'express'

import { connectDatabase } from './config/database'
import { env } from './config/env'
import { errorHandler } from './middleware/errorHandler'
import apiRoutes from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', apiRoutes)

app.use(errorHandler)

const start = async () => {
  await connectDatabase()
  app.listen(env.port, () => {
    console.log(`🚀 API ready at http://localhost:${env.port}`)
  })
}

void start()


