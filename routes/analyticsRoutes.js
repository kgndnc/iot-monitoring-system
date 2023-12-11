const router = require('express').Router()

const { getAnalyticsData } = require('../controllers/analyticsControllers')

// GET /analytics/{metric}: Retrieve analytics or aggregated data for a specific metric.
router.get('/:metric', getAnalyticsData)

module.exports = router

