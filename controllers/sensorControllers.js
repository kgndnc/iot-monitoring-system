// controllers/sensorController.js

const sensors = [{ id: 1, name: 'dummy' }]

// @method  POST
// @route   /sensors
// @access  public
// @desc    Register a new sensor with its metadata.
const registerSensor = (req, res) => {
	const { sensorId, metadata } = req.body
	sensors.push({ id: sensorId, metadata })
	res.status(201).json({ message: 'Sensor registered successfully' })
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

