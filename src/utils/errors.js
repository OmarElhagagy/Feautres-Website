export class APIError extends Error {
	constructor(statusCode, type, message) {
		super(message)
		this.statusCode = statusCode
		this.type = type
	}
}

export const ErrorTypes = {
	AUTH: 'auth',
	INPUT: 'input',
	NOT_FOUND: 'not_found',
	VALIDATION: 'validation',
	DATABASE: 'databse',
	INTERNAL: 'internal'
}

export const createAuthError = (message = 'Unauthorized') => {
	new APIError(401, ErrorTypes.AUTH, message)
}

export const createInputError = (message = 'Invalid Input') => {
	new APIError(400, ErrorTypes.INPUT, message)
}

export const createNotFoundError = (message = 'Resource Not Found') => {
	new APIError(404, ErrorTypes.NOT_FOUND, message)
}
