import prisma from '../db'
import { asyncHandler } from '../middleware/errorHandler'
import { createNotFoundError, createInputError } from '../utils/errors'

// GET all products
export const getProducts = asyncHandler(async (req, res) => {
	const products = await prisma.product.findMany({
		where: {
			belongsToId: req.user.id
		},
		include: {
			updates: {
				select: {
					id: true,
					title: true,
					status: true,
					updatedAt: true
				}
			}
		}
	})

	if (products.length === 0) {
		throw createNotFoundError('No products found')
	}

	res.json({ data: products })
})

// GET one product
export const getOneProduct = asyncHandler(async (req, res) => {
	const product = await prisma.product.findUnique({
		where: {
			id_belongsToId: {
				id: req.params.id,
				belongsToId: req.user.id
			}
		},
		include: {
			updates: true
		}
	})

	if (!product) {
		throw createNotFoundError('Product not found')
	}

	res.json({ data: product })
})

// Create a product 
export const createProduct = asyncHandler(async (req, res) => {
	if (!req.body.name) {
		throw createInputError('Product name is required')
	}

	const product = await prisma.product.create({
		data: { // we tell prisma what data we are giving it to create sth so its called data(we know this from routes)
			name: req.body.name,
			belongsToId: req.user.id
		}
	})

	res.status(201).json({ data: product })
})

// UPDATE a product
export const updateProduct = asyncHandler(async (req, res) => {
	if (!req.body.name) {
		throw createInputError('Product name is required')
	}

	const existingProduct = await prisma.product.findUnique({
		where: {
			id_belongsToId: {
				id: req.params.id,
				belongsToId: req.user.id
			}
		}
	})

	if (!existingProduct) {
		throw createNotFoundError('Product not found')
	}

	const product = await prisma.product.update({ //update is find and write so we need where and data 
		where: {
			id_belongsToId: {
				id: req.params.id,
				belongsToId: req.user.id
			}
		},
		data: {
			name: req.body.name
		}
	})

	res.json({ data: product })
})

// DELETE a product
export const deleteProduct = asyncHandler(async (req, res) => {
	const existingProduct = await prisma.product.findUnique({
		where: {
			id_belongsToId: {
				id: req.params.id,
				belongsToId: req.user.id
			}

		},
		include: {
			updates: true
		}
	})

	if (!existingProduct) {
		throw createNotFoundError('Product not found')
	}

	const deleted = await prisma.product.delete({
		where: {
			id_belongsToId: {
				id: req.params.id,
				belongsToId: req.user.id
			}
		}
	})
	res.status(204).end()
})
