const router = require('express').Router()

const { getAlerts } = require('../controllers/alertControllers')

// GET /alerts: Retrieve alerts for abnormal sensor readings.
router.get('/', getAlerts)

module.exports = router

