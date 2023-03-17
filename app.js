const express = require('express')
const app = express()
// routes
const tasks = require('./routes/tasks')
const categories = require('./routes/category')
const auth = require('./routes/auth')
// authenticate
const authenticateUser = require('./middleware/authentication')
// db
const connectDB = require('./db/connect')
// .env file access
require('dotenv').config()
// error middle wares
const notFound = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/error-handler')
// extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')

app.set('trust proxy', 1)
// middleware
app.use(rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100
}))
app.use(express.json())
app.use(helmet())
app.use(cors({
    origin: '*'
}));

app.use(xss())


app.get('/', (req, res) => {
	res.send('Site seems fine')
})

// routes
app.use('/api/v1/auth', auth)
app.use('/api/v1/tasks', authenticateUser, tasks)
app.use('/api/v1/categories', authenticateUser, categories)

// middleware
app.use(notFound)
app.use(errorHandlerMiddleware)

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