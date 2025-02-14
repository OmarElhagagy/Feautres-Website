import Router from 'express'
import { body, oneOf, validationResult } from 'express-validator'
import { handleInputErrors } from './modules/middleware'
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/product'
import { createUpdates, deleteUpdates, getOneUpdate, getUpdates, updateUpdates } from './handlers/update'
import { createUpdatedPoints, deleteUpdatedPoints, getOneUpdatedPoints, getUpdatedPoints, updateUpdatedPoints } from './handlers/updatePoints'

const router = Router()

// products
router.get('/product', getProducts)
router.get('/product/:id', getOneProduct)
// what the body('name')which is a middleware says is req.body which is an object should have a field on it called name
router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct) // update a product by a given id
router.post('/product', body('name').isString(), handleInputErrors, createProduct) // create a product
router.delete('/product/:id', deleteProduct)

// updates
router.get('/update', getUpdates)
router.get('update/:id', getOneUpdate)
router.put('/update/:id',
	body('title').optional(),
	body('body').optional(),
	body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
	body('version').optional(),
	body('productId').exists().isString(),
	updateUpdates)
router.post('/update',
	body('title').exists(),
	body('body').exists().isString(),
	createUpdates)
router.delete('/update/:id', deleteUpdates)

// update point
router.get('/updatepoint', getUpdatedPoints)
router.get('updatepoint/:id', getOneUpdatedPoints)
router.put('/updatepoint/:id',
	body('name').optional().isString(),
	body('description').optional().isString(),
	updateUpdatedPoints)
router.post('/updatepoint',
	body('name').isString(),
	body('description').isString(),
	body('updateId').exists().isString(),
	createUpdatedPoints)
router.delete('/updatepoint/:id', deleteUpdatedPoints)


export default router

