import prisma from '../db'
import { asyncHandler } from '../middleware/errorHandler'
import { createInputError, createNotFoundError } from '../utils/errors'

// GET UPDATES
export const getUpdates = asyncHandler(async (req, res) => {
	const updates = await prisma.update.findMany({
		where: {
			userId: req.user.id
		},
	})

	if (updates.length === 0) {
		throw createNotFoundError('No updates found')
	}

	res.json({ data: updates })
})
// GET ONE UPDATE
export const getOneUpdate = asyncHandler(async (req, res) => {
	const update = await prisma.update.findFirst({
		where: {
			id: req.params.id,
			userId: req.user.id
		}
	})

	if (!update) {
		throw createNotFoundError('Update not found')
	}

	res.json({ data: update })
})
// CREATE UPDATES
export const createUpdates = asyncHandler(async (req, res) => {
	if (!req.body.name) {
		throw createInputError('Name is required for update')
	}

	const updates = await prisma.update.create({
		data: {
			...req.body,
			userId: req.user.id,
			updatedAt: new Date()
		}
	})
	res.json({ data: updates })
})
// UPDATE UPDATES
export const updateUpdates = asyncHandler(async (req, res) => {
	if (!req.body.name) {
		throw createInputError('No updates made')
	}

	const existingUpdate = await prisma.update.findFirst({
		where: {
			id: req.params.id,
			userId: req.user.id
		}
	})

	if (!existingUpdate) {
		throw createNotFoundError('Update not found')
	}

	const update = await prisma.update.update({
		where: {
			id: req.params.id,
			userId: req.user.id
		},
		data: {
			...req.body
		}
	})
	res.json({ data: update })
})
// DELETE UPDATES
export const deleteUpdates = asyncHandler(async (req, res) => {
	const existingUpdate = await prisma.update.findFirst({
		where: {
			id: req.params.id,
			userId: req.user.id
		}
	})

	if (!existingUpdate) {
		throw createNotFoundError('Update not found')
	}

	const deleted = await prisma.update.delete({
		where: {
			id: req.params.id,
			userId: req.user.id
		}
	})
	res.status(204).end()
})
