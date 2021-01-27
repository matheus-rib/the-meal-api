import 'reflect-metadata'
import api from './config/Api'

try {
  api.server.listen(80, () => {
    console.log('🚀 API ready at http://localhost:80/')
  })
} catch (e) {
  console.log(e)
  process.exit(1)
}
