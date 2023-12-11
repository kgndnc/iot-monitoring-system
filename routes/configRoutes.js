const router = require('express').Router()

const {
	getSystemConfig,
	updateSystemConfig,
} = require('../controllers/configControllers')

// GET /config: Retrieve system configuration settings.
router.get('/', getSystemConfig)

// PUT /config: Update system configuration settings.
router.put('/', updateSystemConfig)

module.exports = router

