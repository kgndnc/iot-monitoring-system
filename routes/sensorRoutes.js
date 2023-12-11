const router = require('express').Router()

// require from controllers
const {
	registerSensor,
	checkSensorStatus,
	getSensorInfo,
} = require('../controllers/sensorControllers')

// POST /sensors: Register a new sensor with its metadata.
router.post('/', registerSensor)

// GET /sensors/{sensor_id}: Retrieve information about a specific sensor.
router.get('/:sensor_id', getSensorInfo)

// @method  GET
// @route   /sensors/{sensor_id}/status
// @access  public
// @desc    Check the status of a sensor (online/offline)
router.get('/:sensor_id/status', checkSensorStatus)

module.exports = router

