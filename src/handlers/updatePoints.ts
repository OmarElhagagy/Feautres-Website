import prisma from '../db'

// GET POINTS UPDATED
export const getUpdatedPoints = async (req, res) => {
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
	res.json({ data: updatePoints })
}
// GET ONE UPDATED POINT
export const getOneUpdatedPoints = async (req, res) => {
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
	res.json({ data: updatePoints })
}
// CREATE UPDATED POINT
export const createUpdatedPoints = async (req, res) => {
	const updatePoints = await prisma.updatePoint.create({
		data: {
			name: req.body.name,
			description: req.body.description,
			updateId: req.body.updateId,
			updatedAt: new Date()
		}
	})
	res.json({ data: updatePoints })
}
// UPDATE UPDATED POINTS
export const updateUpdatedPoints = async (req, res) => {
	const updatePoints = await prisma.updatePoint.update({
		where: {
			id: req.params.id,
			update: {
				userId: req.user.id
			}
		},
		data: {
			name: req.body.id,
			description: req.body.description,
			updatedAt: new Date()
		}
	})
	res.json({ data: updatePoints })
}
// DELETE UPDATED POINTS
export const deleteUpdatedPoints = async (req, res) => {
	const updatePoints = await prisma.updatePoint.delete({
		where: {
			id: req.params.id,
			update: {
				userId: req.user.id
			}
		}
	})
	res.json({ data: updatePoints })
}
