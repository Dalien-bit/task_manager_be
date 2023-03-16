const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const {
	createCustomError
} = require('../errors/custom-error')
const {
	NotFoundError
} = require("../errors")

const getAllTasks = asyncWrapper(async (req, res) => {
	const {
		name,
		category,
		completed,
		sort
	} = req.query;
	const queryObject = {
		createdBy: req.user.userId
	};
	if (category) {
		queryObject.categories = {
			$all: [category]
		}
	}
	if (completed) {
		queryObject.completed = (completed === 'true' ? true : false);
	}
	if (name) {
		queryObject.name = {
			$regex: name,
			$options: 'i'
		}
	}
	let result = Task.find(queryObject)
	if (sort) {
		let sortList = sort.split(',').join(' ')
		result.sort(sortList)
	} else {
		result.sort('createdAt')
	}
	const page = req.query.page || 1;
	const limit = req.query.limit || 2;
	const skip = (page - 1) * limit;
	result.skip(skip).limit(limit);
	const tasks = await result
	res.status(200).json({
		tasks
	})
})


const createTask = asyncWrapper(async (req, res) => {
	// make sure you receive the deadline as a string in this format - '7/22/2008 12:11:04 PM'
	if (req.body.deadline) {
		req.body.deadline = new Date(req.body.deadline)
	}
	const task = await Task.create({
		...req.body,
		createdBy: req.user.userId
	})
	res.status(201).json({
		task
	})
})


const getSingleTask = asyncWrapper(async (req, res, next) => {
	const {
		id: taskID
	} = req.params
	const task = await Task.findOne({
		_id: taskID
	})
	if (!task) {
		// throw new NotFoundError(`No task with id: ${taskID}`)
		return next(createCustomError(`No task with id: ${taskID}`, 404))
	}
	if (task.createdBy !== req.user.userId) {
		return next(createCustomError(`Sorry you are not allowed to access this data`, 400))
	}
	res.status(200).json({
		task
	})

})

const updateTask = asyncWrapper(async (req, res, next) => {
	const {
		id: taskID
	} = req.params
	const task = await Task.findOneAndUpdate({
		_id: taskID
	}, req.body, {
		new: true,
		runValidators: true
	})
	if (!task) {
		return next(createCustomError(`No task with id: ${taskID}`, 404))
	}
	res.status(200).json({
		task
	})

})


const deleteTask = asyncWrapper(async (req, res, next) => {
	const {
		id: taskID
	} = req.params
	const task = await Task.findOneAndDelete({
		_id: taskID
	})
	if (!task) {
		return next(createCustomError(`No task with id: ${taskID}`, 404))
	}
	res.status(200).json({
		task
	})

})



module.exports = {
	getAllTasks,
	createTask,
	getSingleTask,
	updateTask,
	deleteTask,
}