const Data = require('../models/dataModel')

// @method  POST
// @route   /data
// @access  public
// @desc    Submit sensor data to the system
const submitSensorData = async (req, res) => {
	const { sensor_id: sensorId, data } = req.body

	let newData

	try {
		newData = await Data.create({ sensor: sensorId, data: data })
	} catch (err) {
		console.error('There was an error\n', err)

		res.status(400).json({
			message: `Error: Sensor could not be registered`,
			error: err.message,
		})

		return
	}

	newData
		.save({ validateBeforeSave: true })
		.then(() => {
			console.log('Document inserted successfully')
		})
		.catch(err => {
			console.error('Error inserting document:', err)

			res.status(400).json({
				error: err.message,
			})

			return
		})

	res.status(201).json({ message: 'Sensor data submitted successfully' })
}

// @method  GET
// @route   /data/:sensor_id
// @access  public
// @desc    Retrieve data from a specific sensor
const getSensorData = async (req, res) => {
	const { sensor_id: sensorId } = req.params

	console.log({ sensorId })

	let data

	try {
		data = await Data.find({ sensor: sensorId })
	} catch (err) {
		console.error('There was an error\n', err)

		res.status(400).json({
			error: err.message,
		})

		return
	}

	if (data) {
		res.status(200).json({
			data: data.map(data => ({
				data: data.data,
				created_at: data.createdAt,
			})),
		})
	} else {
		res.status(404).json({ message: 'Resource not found' })
	}
}

// @method  GET
// @route   /data?start_date={start_date}&end_date={end_date}
// @access  public
// @desc    Retrieve data within a specified date range
const getDataInDateRange = async (req, res) => {
	const { start_date, end_date } = req.query

	// Implement logic to filter data within the specified date range

	// const startDate = new Date('2024-01-01T22:00:47.537Z')
	// const endDate = new Date('2024-02-01')

	const startDate = new Date(start_date) // Assuming start_date is a valid date string
	const endDate = new Date(end_date)

	console.log('start date', startDate)

	let data

	try {
		data = await Data.find({ createdAt: { $gte: startDate, $lte: endDate } })
	} catch (err) {
		console.error('There was an error\n', err)

		res.status(400).json({
			error: err.message,
		})

		return
	}

	if (data) {
		res.status(200).json({
			count: data.length,
			data: data.map(data => ({
				data: data.data,
				created_at: data.createdAt,
			})),
		})
	} else {
		res.status(404).json({ message: 'Resource not found' })
	}
}

module.exports = { getDataInDateRange, getSensorData, submitSensorData }

