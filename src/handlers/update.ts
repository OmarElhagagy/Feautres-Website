import prisma from '../db'

// GET UPDATES
export const getUpdates = async (req, res) => {
	const updates = await prisma.update.findMany({
		where: {
			userId: req.user.id
		},
	})
	res.json({ data: updates })
}
// GET ONE UPDATE
export const getOneUpdate = async (req, res) => {
	const update = await prisma.update.findUniqueOrThrow({
		where: {
			id: req.params.id,
			userId: req.user.id
		}
	})
	res.json({ data: update })
}
// CREATE UPDATES
export const createUpdates = async (req, res) => {
	const updates = await prisma.update.create({
		data: {
			...req.body,
			userId: req.user.id,
			updatedAt: new Date()
		}
	})
	res.json({ data: updates })
}
// UPDATE UPDATES
export const updateUpdates = async (req, res) => {
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
}
// DELETE UPDATES
export const deleteUpdates = async (req, res) => {
	const deleted = await prisma.update.delete({
		where: {
			id: req.params.id,
			userId: req.user.id
		}
	})
	res.json({ data: deleted })
}
