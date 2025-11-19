import { Router } from 'express'

import statusRoutes from './status.routes'

const router = Router()

router.use('/status', statusRoutes)

export default router


