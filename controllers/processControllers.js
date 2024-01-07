// @method  POST
// @route   /process
// @access  public
// @desc    Initiate data processing for a specific set of sensors
// @payload   { sensor_ids: [], sensor_type: string }
const processData = (req, res) => {
	const { sensor_ids: sensorIds, sensor_type, metadata } = req.body

	if (sensorIds) {
		// If sensor ids are given initiate processing for them

		res.status(201).json({
			message:
				'processing has started for following ' + JSON.stringify(sensorIds),
		})
	} else if (sensor_type) {
		// Process certain type of sensors
	} else {
		res.status(400).json({
			message: 'Error. No ids or types were given',
		})
	}
}

module.exports = { processData }

