import { Router } from 'express'
import * as packageJson from '../../package.json'
import mealsRoutes from './meals'

const router = Router()

router.get('/', (req, res) => {
  res.json({
    name: packageJson.name,
    version: packageJson.version,
    author: packageJson.author,
    license: packageJson.license,
    repository: packageJson.repository.url,
  })
})

router.use('/meals', mealsRoutes)

export default router
