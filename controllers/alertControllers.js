const Alert = require('../models/alertModel')

// @method  GET
// @route   /alerts
// @access  public
// @desc    Retrieve alerts for abnormal sensor readings
const getAlerts = async (req, res) => {
	const { start_date, end_date } = req.query

	if (start_date && end_date) {
		getAlertsInRange(req, res, start_date, end_date)
		return
	}

	try {
		const { type } = req.body

		// Perform asynchronous operation (database query)
		const alerts = await Alert.find(
			type ? { 'nonOptimalRecording.data.type': type } : {}
		)

		// Send the result as JSON
		res.status(200).json({ alerts })
	} catch (error) {
		// Handle the error
		console.error('Error in getAlerts:', error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}

const getAlertsInRange = async (req, res, start_date, end_date) => {
	console.log({ start_date, end_date })

	try {
		// Validate date strings
		const startDate = new Date(start_date)
		const endDate = new Date(end_date)

		// Check if the dates are valid
		if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
			return res.status(400).json({ error: 'Invalid date format' })
		}

		// Implement logic to filter data within the specified date range
		const alerts = await Alert.find({
			'nonOptimalRecording.createdAt': { $gte: startDate, $lte: endDate },
		})

		if (alerts.length > 0) {
			res.status(200).json({
				count: alerts.length,
				alerts,
			})
		} else {
			res
				.status(404)
				.json({ message: 'No alerts found within the specified date range' })
		}
	} catch (error) {
		console.error('Error in getAlertInDateRange:', error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}

module.exports = { getAlerts }

