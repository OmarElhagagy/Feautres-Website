//Integration testing will test how an entire route works by actually making a request like a client would and observe what the   api sent back making observation based on result
import app from '../server'
//import * as supertest from 'supertest'
const supertest = require('supertest')
describe('GET/', () => {
	it('should send back some data', async () => {
		// do things like changing the headers, sending body
		const res = await supertest(app).get('/')

		expect(res.body.message).toBe('hello')
	})
})
