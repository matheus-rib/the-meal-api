import { Router } from 'express'
import * as packageJson from '../../package.json'

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

export default router
