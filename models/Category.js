const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'must provide category name']
	}
})

module.exports = mongoose.model('Category', CategorySchema)
