const Data = require('../models/dataModel')
const Config = require('../models/configModel')
const Alert = require('../models/alertModel')

// @method  POST
// @route   /process
// @access  public
// @desc    Initiate data processing for a specific set of sensors
// @payload   { sensor_ids: [], sensor_type: string }
const processData = async (req, res) => {
	const { sensor_ids: sensorIds, sensor_type, metadata } = req.body

	if (sensorIds) {
		// If sensor ids are given initiate processing for them

		res.status(201).json({
			message:
				'processing has started for following ' + JSON.stringify(sensorIds),
		})
	} else if (sensor_type) {
		// Process certain type of sensors

		// sensor_type === "Temperature"

		const allData = await Data.find({ 'data.type': sensor_type })

		console.log(allData)
		console.log('allData')

		const config = await Config.findOne()

		const minValue = config.min[sensor_type].value
		const maxValue = config.max[sensor_type].value

		allData.forEach(async eachEntry => {
			const measurementForEachData = eachEntry.data.measurement

			console.log({ measurementForEachData, minValue, maxValue })

			if (
				measurementForEachData > maxValue ||
				measurementForEachData < minValue
			) {
				console.log('There is problem for this data', eachEntry)
				// Generate alert to alert collection

				// Check if it exists
				const doesAlertExist = await Alert.exists({
					'nonOptimalRecording.data._id': eachEntry.data._id,
				})

				if (doesAlertExist) return

				// Add to alert
				const new_alert = await Alert.create({
					nonOptimalRecording: eachEntry,
					cause: measurementForEachData > maxValue ? 'Too High' : 'Too Low',
				})

				console.log('Alert generated', new_alert)
			}
			{
				console.log('All is good, values are optimal')
			}
		})

		res.status(200).json({ msg: 'Processing for ' + JSON.stringify(allData) })
	} else {
		res.status(400).json({
			message: 'Error. No ids or types were given',
		})
	}
}

module.exports = { processData }

