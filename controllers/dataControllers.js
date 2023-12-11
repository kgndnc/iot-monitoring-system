const sensorData = []

// @method  POST
// @route   /data
// @access  public
// @desc    Submit sensor data to the system
const submitSensorData = (req, res) => {
	const { sensorId, data } = req.body
	sensorData.push({ sensorId, data })
	res.status(201).json({ message: 'Sensor data submitted successfully' })
}

// @method  GET
// @route   /data/:sensor_id
// @access  public
// @desc    Retrieve data from a specific sensor
const getSensorData = (req, res) => {
	const { sensorId } = req.params
	const data = sensorData.filter(entry => entry.sensorId === sensorId)
	res.json(data)
}

// @method  GET
// @route   /data?start_date={start_date}&end_date={end_date}
// @access  public
// @desc    Retrieve data within a specified date range
const getDataInDateRange = (req, res) => {
	const { start_date, end_date } = req.query
	// Implement logic to filter data within the specified date range
	// For simplicity, returning all data for now
	res.json(sensorData)
}

module.exports = { getDataInDateRange, getSensorData, submitSensorData }

