const express = require('express')

const app = express()
const PORT = 3000

// Mongoose
const mongoose = require('mongoose')

// Connect to MongoDB
mongoose
	// username:password@host:port/
	.connect('mongodb://root:example@127.0.0.1:27017/iot-monitoring-system', {
		// .connect("mongodb://root:example@mongo:27017/iot-monitoring-system", {
		authSource: 'admin',
	})
	.then(() => {
		console.log('Connected to MongoDB')
	})
	.catch(err => {
		console.error('Error connecting to MongoDB:', err)
	})

app.use(express.json())

app.get('/', async (req, res) => {
	console.log('request incoming...')

	const examples = await ExampleModel.create({
		name: 'name-1',
		description: 'description-1',
	})

	examples
		.save()
		.then(() => {
			console.log('Document inserted successfully')
		})
		.catch(err => {
			console.error('Error inserting document:', err)
		})

	res.status(200).send('<h1>Hello, World!</h1>')
})

app.use('/sensors', require('./routes/sensorRoutes'))
app.use('/data', require('./routes/dataRoutes'))
app.use('/process', require('./routes/processRoutes'))
app.use('/analytics', require('./routes/analyticsRoutes'))
app.use('/alerts', require('./routes/alertRoutes'))
app.use('/config', require('./routes/configRoutes'))

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}...`)
})

