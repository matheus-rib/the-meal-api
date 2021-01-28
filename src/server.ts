import 'reflect-metadata'
import api from './config/Api'
const port = process.env.PORT

try {
  api.server.listen(port, () => {
    console.log(`🚀 API ready at http://localhost:${port}/`)
  })
} catch (e) {
  console.log(e)
  process.exit(1)
}
