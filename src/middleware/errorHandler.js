import { APIError, ErrorTypes } from "../utils/errors"

export const errorHnadler = (err, req, res, next) => {
	console.error('Error: ', {
		message: err.message,
		stack: err.stack,
		type: err.type
	})

	if (err instanceof APIError) {
		return res.status(err.statusCode).json({
			status: 'error',
			type: err.type,
			message: err.message
		})
	}

	if (err.code && err.code.startsWith('P')) {
		return res.status(400).json({
			status: 'error',
			type: ErrorTypes.DATABASE,
			message: 'Database operation failed'
		})
	}

	res.status(500).json({
		status: 'error',
		type: ErrorTypes.INTERNAL,
		message: 'An unexpected error occured'
	})

}

export const asyncHandler = (fn) => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch(next)
}
