const Category = require('../models/Category')
const asyncWrapper = require('../middleware/async')
const {
	createCustomError
} = require('../errors/custom-error')

// Get All Category
const getAllCategory = asyncWrapper(async (req, res) => {
	const categories = await Category.find({})
	res.status(200).json({
		categories
	})
})

// Create Category
const createCategory = asyncWrapper(async (req, res) => {
	const category = await Category.create(req.body)
	res.status(200).json({
		category
	})
})

// Update Category
const updateCategory = asyncWrapper(async (req, res, next) => {
	const {
		id: categoryID
	} = req.params
	const category = await Category.findOneAndUpdate({
		_id: categoryID
	}, req.body, {
		new: true,
		runValidators: true
	})
	if (!category) {
		return next(createCustomError(`Cannot find category with id ${categoryID}`, 404))
	}
	res.status(200).json({
		category
	})
})

// Delete Category
const deleteCategory = asyncWrapper(async (req, res, next) => {
	const {
		id: categoryID
	} = req.params
	const category = await Category.findOneAndDelete({
		_id: categoryID
	})
	if (!category) {
		return next(createCustomError(`Cannot find category with id ${categoryID}`, 404))
	}
	res.status(200).json({
		category
	})
})

module.exports = {
	getAllCategory,
	createCategory,
	updateCategory,
	deleteCategory
}