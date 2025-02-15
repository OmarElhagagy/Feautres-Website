import prisma from '../db'
import { asyncHandler } from '../middleware/errorHandler'
import { hashPassword, createJWT, comparePasswords } from '../modules/auth'
import { APIError, ErrorTypes, createAuthError, createInputError, createNotFoundError } from '../utils/errors'

export const createNewUser = asyncHandler(async (req, res) => {
	if (!req.body.username || !req.body.password) {
		throw createInputError('Username and passwrod are required')
	}

	const existingUser = await prisma.user.findUnique({
		where: {
			username: req.body.username
		}
	})

	if (existingUser) {
		throw createInputError('Username already exists')
	}

	const user = await prisma.user.create({
		data: {
			username: req.body.username,
			password: await hashPassword(req.body.password)
		}
	})

	const token = createJWT(user)
	res.json({ token })
})

export const signin = async (req, res) => {
	if (!req.body.username || !req.body.password) {
		throw createInputError('Username and password are required')
	}

	const user = await prisma.user.findUnique({
		where: {
			username: req.body.username,
		}
	})

	if (!user) {
		createAuthError('Invalid username or password')
	}

	const isValid = await comparePasswords(req.body.password, user.password)

	if (!isValid) {
		throw createAuthError('Invalid username or password')
	}

	const token = createJWT(user)
	res.json({ token })
}
