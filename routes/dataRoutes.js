const router = require('express').Router()

// require from controllers
const {
	getDataInDateRange,
	submitSensorData,
	getSensorData,
} = require('../controllers/dataControllers')

// GET /data?start_date={start_date}&end_date={end_date}: Retrieve data within a
// specified date range.
router.get('/', getDataInDateRange)

// POST /data: Submit sensor data to the system.
router.post('/', submitSensorData)

// GET /data/{sensor_id}: Retrieve data from a specific sensor.
router.get('/:sensor_id', getSensorData)

module.exports = router

