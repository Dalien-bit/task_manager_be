const express = require('express')
const router = express.Router()

const { getAllCategory, createCategory, updateCategory, deleteCategory } = require('../controller/category.js')

router.route('/').get(getAllCategory).post(createCategory)
router.route('/:id').patch(updateCategory).delete(deleteCategory)

module.exports = router