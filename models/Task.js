const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'must provide name'],
		trim: true,
		maxLength: [150, 'name cannot be more than 150 characheters']
	},
	description: {
		type: String
	},
	completed: {
		type: Boolean,
		default: false,
	},
	deadline: {
		type: Date
	},
	categories: {
		type: [String],
		default: []
	},
	link: {
		type: String
	},
	createdBy: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: [true, 'provide user']
	}
}, {
	timestamps: true
})

module.exports = mongoose.model('Task', TaskSchema)