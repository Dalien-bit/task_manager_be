const User = require('../models/User')
const {
	StatusCodes
} = require('http-status-codes')
const {
	createCustomError
} = require('../errors/custom-error')
const register = async (req, res) => {
	const user = await User.create({
		...req.body
	})
	const token = user.createJWT()
	res.status(StatusCodes.CREATED).json({
		user: {
			name: user.name
		},
		token
	})
}

const login = async (req, res, next) => {
	const {
		email,
		password
	} = req.body
	if (!email || !password) {
		return next(createCustomError(`Some error`, 400))
	}
	const user = await User.findOne({
		email
	})
	if (!user) {
		throw new UnauthenticatedError
	}
	const isPasswordCorrect = await user.comparePassword(password)
	if (!isPasswordCorrect) {
		return next(createCustomError(`Some error`, 400))
	}
	const token = user.createJWT()
	res.status(StatusCodes.OK).json({
		user: {
			name: user.name
		},
		token
	})
}

module.exports = {
	register,
	login
}