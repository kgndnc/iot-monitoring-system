// @method  GET
// @route   /config
// @access  public

const Config = require('../models/configModel')

// @desc    Retrieve system configuration settings
const getSystemConfig = async (req, res) => {
	const config = await Config.findOne({})

	res.json({ config })
}

// @method  PUT
// @route   /config
// @access  public
// @desc    Update system configuration settings
const updateSystemConfig = async (req, res) => {
	try {
		// Use findOneAndUpdate to update the existing document or create one if it doesn't exist
		const updatedConfig = await Config.findOneAndUpdate(
			{},
			{ $set: req.body.config }, // Update with the request body
			{ new: true, upsert: true, runValidators: true }
		)

		res.json(updatedConfig)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}

module.exports = { getSystemConfig, updateSystemConfig }

