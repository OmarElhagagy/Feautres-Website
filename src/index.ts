import * as dotenv from 'dotenv'
dotenv.config() // the reason why we put this on the index file bec this is the entry point to our server so we want these env to be uploaded immediatly

import app from './server'


app.listen(4000, () => {
	console.log('hello')
})
