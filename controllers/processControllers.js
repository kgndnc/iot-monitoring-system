// @method  POST
// @route   /process
// @access  public
// @desc    Initiate data processing for a specific set of sensors
const processData = (req, res) => {
	const { sensorIds, metadata } = req.body

	res.status(201).json({
		message:
			'processing has started for following ' + JSON.stringify(sensorIds),
	})
}

module.exports = { processData }

