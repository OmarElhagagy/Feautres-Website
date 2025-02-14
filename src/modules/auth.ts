import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export const comparePasswords = (password, hashedPassword) => {
	return bcrypt.compare(password, hashedPassword)
}

export const hashPassword = (password) => {
	return bcrypt.hash(password, 5)
}

// create jwt token for user 
export const createJWT = (user) => {
	//jwt.sign() creates a token with user data and secret key
	const token = jwt.sign({
		id: user.id,
		username: user.username
	},
		process.env.JWT_SECRET
	)
	return token
}

// Middleware to protect routes
export const protect = (req, res, next) => {
	// gets authorization header
	const bearer = req.headers.authorization
	//check if headers exist
	if (!bearer) {
		res.status(401)
		res.json({ message: "Not authorized" })
		return
	}
	// Splits "Bearer token123" into ["Bearer", "token123"] and gets token
	const [, token] = bearer.split(' ')//we want token to look like: bearer safnaksfnfnaolna <= random nums is out token

	if (!token) {
		res.status(401)
		res.json({ message: "Invalid token" })
		return
	}

	try {
		//Verifies token with secret key
		const user = jwt.verify(token, process.env.JWT_SECRET)
		// Attaches user to request for later middleware/routes
		req.user = user// if its the user we will attach it to the req
		next()
	} catch (error) {
		console.log(error)
		res.status(401)
		res.json({ message: "Invalid token" })
		return
	}

}
