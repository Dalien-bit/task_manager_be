const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config() 

// middleware
app.use(express.json())



// routes
app.get('/hello', (req, res) => {
	res.send('hello');
})

app.use('/api/v1/tasks', tasks)

// app.get('/api/v1/tasks')           - get all tasks
// app.post('/api/v1/tasks')          - create a new task
// app.get('/api/v1/tasks/:id')       - get a specific task
// app.patch('/api/v1/tasks/:id')     - update a task
// app.delete('api/v1/tasks/:id')     - delete a task

const port = process.env.PORT || 5000

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, console.log(`server is listening on ${port}...`))
	} catch (error) {
		console.log(error)
	}
}

start();
