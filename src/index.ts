import dotenv from 'dotenv'
dotenv.config() // the reason why we put this on the index file bec this is the entry point to our server so we want these env to be uploaded immediatly
import config from './config.js'
import app from './server.js'

const PORT = config.port || 5000

app.listen(PORT, () => {
	console.log('here')
	console.log(`Server is running on port ${PORT}`)
})
  
