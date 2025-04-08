import * as dotenv from 'dotenv'
dotenv.config() // the reason why we put this on the index file bec this is the entry point to our server so we want these env to be uploaded immediatly
import config from './config'
import app from './server'


app.listen(config.port, () => {
	console.log('here')
	console.log(`Server is listenining on port ${config.port}`)
})
  
