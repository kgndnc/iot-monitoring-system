// @method  POST
// @route   /sensors
// @access  public

const Sensor = require('../models/sensorModel')

// @desc    Register a new sensor with its metadata.
const registerSensor = async (req, res) => {
	const { metadata } = req.body
	console.log({ metadata })

	let newSensor

	try {
		newSensor = await Sensor.create(metadata)
	} catch (err) {
		console.error('There was an error\n', err)

		res.status(400).json({
			message: `Error: Sensor could not be registered`,
			error: err.message,
		})

		return
	}

	newSensor
		.save({ validateBeforeSave: true })
		.then(() => {
			console.log('Document inserted successfully')
		})
		.catch(err => {
			console.error('Error inserting document:', err)
		})

	const designatedId = newSensor.get('sensor_id')

	res
		.status(201)
		.json({ message: `Sensor registered successfully with id ${designatedId}` })
}

// @method  GET
// @route   /sensors/:sensor_id
// @access  public
// @desc    Retrieve information about a specific sensor
const getSensorInfo = (req, res) => {
	const { sensor_id: sensorId } = req.params
	const sensor = sensors.find(s => s.id === Number(sensorId))

	if (sensor) {
		res.status(200).json(sensor)
	} else {
		res.status(404).json({ msg: 'Resource not found' })
	}
}

// @method  GET
// @route   /sensors/:sensor_id/status
// @access  public
// @desc    Check the status of a sensor (online/offline)
const checkSensorStatus = (req, res) => {
	const { sensorId } = req.params
	// Implement logic to check the status of the sensor (online/offline)
	res.json({ status: 'online' })
}

module.exports = { registerSensor, checkSensorStatus, getSensorInfo }

