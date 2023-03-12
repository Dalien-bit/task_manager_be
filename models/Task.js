const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'must provide name'],
		trim: true,
		maxLength: [150, 'name cannot be more than 20 characheters']
	},
	description: {
		type: String
	},
	completed:{
		type: Boolean,
		default: false, 
	}, 
	categories: {
		type: [String],
		default: []
	}
})

module.exports = mongoose.model('Task', TaskSchema)