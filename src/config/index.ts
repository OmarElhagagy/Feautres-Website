import merge from 'lodash.merge'

//make sure NODE_ENV is set
process.env.NODE_ENV = process.env.NODE_ENV || "development"
const stage = process.env.STAGE || "local"

let envConfig

if (stage === 'production') {
	envConfig = require('../config/production').default
} else if (stage === 'testing') {
	envConfig = require('../config/testing')
} else {
	envConfig = require('../config/local')
}

const defaultConfig = {
	stage,
	dbURL: process.env.DATABASE_URL,
	jwtSecret: process.env.JWT_SECRET,
	port: 4000,
	logging: false
}

export default merge(defaultConfig, envConfig)
