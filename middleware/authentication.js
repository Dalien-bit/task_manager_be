const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {
	UnauthenticatedError
} = require('../errors')
const {
	createCustomError
} = require('../errors/custom-error')


const auth = async (req, res, next) => {
	const authHeader = req.headers.authorization
	if (!authHeader || !authHeader.startsWith('Bearer')) {
		throw new UnauthenticatedError('Authentication failed')
	}
	const token = authHeader.split(' ')[1]
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET)
		req.user = {
			userId: payload.userId,
			name: payload.name
		}
		next()
	} catch (error) {
		return next(createCustomError(`Some error`, 400))
	}
}

module.exports = auth