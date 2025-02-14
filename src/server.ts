import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/user'
import { errorHandler } from './middleware/errorHandler'
const app = express()

//order matters we always want to put our middleware on the top before our routes

const customLogger = (message) => (req, res, next) => {
	console.log(`hello from ${message}`)
	next()
}

//morgan takes in an option what level of logging do u want 

app.use(cors())
app.use(morgan('dev')) //its for logging requests
app.use(express.json()) //this alows a client to send us json
app.use(express.urlencoded({ extended: true })) //urlencoded allows a client to add things like a query string in parameters and its decodes and enocdes that propely if u dont do that it treats everything like a string for ex:'google.com?a=1, b=things'it takes whats after the ? and put it in an object


// Order matters in defining routes

app.get('/', (req, res, next) => {
	setTimeout(() => {
		next(new Error('hello'))
	}, 1)
})
// i dont want anyone accessing these routes unless they are authenticated so we will add the protect function we made in auth
app.use('/api', protect, router) // every url in router will begin with /api
app.post('/user', createNewUser)
app.post('/sigin', signin)
app.use(errorHandler)


export default app
