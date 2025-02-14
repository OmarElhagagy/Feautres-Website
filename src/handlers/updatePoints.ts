import prisma from '../db'
import { asyncHandler } from '../middleware/errorHandler'
import { createInputError, createNotFoundError } from '../utils/errors'

// GET POINTS UPDATED
export const getUpdatedPoints = asyncHandler(async (req, res) => {
	const updatePoints = await prisma.updatePoint.findMany({
		where: {
			update: {
				userId: req.user.id
			}
		},
		include: {
			update: true
		}
	})

	if (updatePoints.length === 0) {
		throw createNotFoundError('No updated points')
	}

	res.json({ data: updatePoints })
})
// GET ONE UPDATED POINT
export const getOneUpdatedPoints = asyncHandler(async (req, res) => {
	const updatePoints = await prisma.updatePoint.findFirst({
		where: {
			id: req.params.id,
			update: {
				userId: req.user.id
			}
		},
		include: {
			update: true
		}
	})

	if (!updatePoints) {
		throw createNotFoundError('No updated point')
	}

	res.json({ data: updatePoints })
})
// CREATE UPDATED POINT
export const createUpdatedPoints = asyncHandler(async (req, res) => {
	if (!req.body.name) {
		throw createInputError('Name is required for updating point')
	}

	const existingUpdate = await prisma.update.findFirst({
		where: {
			id: req.body.updateId,
			userId: req.user.id
		}
	})

	if (!existingUpdate) {
		throw createNotFoundError('Update not found')
	}

	const updatePoints = await prisma.updatePoint.create({
		data: {
			name: req.body.name,
			description: req.body.description,
			updateId: req.body.updateId,
			updatedAt: new Date()
		}
	})
	res.json({ data: updatePoints })
})
// UPDATE UPDATED POINTS
export const updateUpdatedPoints = asyncHandler(async (req, res) => {
	if (!req.body.name) {
		throw createInputError('name is required for updating points')
	}

	const existingUpdatedPoint = await prisma.updatePoint.findFirst({
		where: {
			id: req.params.id,
			update: {
				userId: req.user.id
			}
		}
	})

	if (!existingUpdatedPoint) {
		throw createNotFoundError('Updated point not found')
	}

	const updatePoints = await prisma.updatePoint.update({
		where: {
			id: req.params.id,
			update: {
				userId: req.user.id
			}
		},
		data: {
			name: req.body.name,
			description: req.body.description,
			updatedAt: new Date()
		}
	})
	res.json({ data: updatePoints })
})
// DELETE UPDATED POINTS
export const deleteUpdatedPoints = asyncHandler(async (req, res) => {
	const existingUpdate = await prisma.updatePoint.findFirst({
		where: {
			id: req.params.id,
			update: {
				userId: req.user.id
			}
		}
	})

	if (!existingUpdate) {
		throw createNotFoundError('Updated point not found')
	}

	const updatePoints = await prisma.updatePoint.delete({
		where: {
			id: req.params.id,
		}
	})
	res.status(204).end()
})
