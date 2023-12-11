const router = require('express').Router()

const { processData } = require('../controllers/processControllers')

// POST /process: Initiate data processing for a specific set of sensors.
router.post('/', processData)

module.exports = router

