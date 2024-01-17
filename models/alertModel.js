const mongoose = require('mongoose')
const Data = require('./dataModel')

const alertSchema = new mongoose.Schema(
	{
		// nonOptimalRecording: mongoose.Schema.Types.Mixed,
		nonOptimalRecording: Data.schema,
		cause: {
			type: mongoose.Schema.Types.String,
			enum: ['Too High', 'Too Low'],
		},
	},
	{ versionKey: false }
)

const Alert = mongoose.model('Alert', alertSchema)

module.exports = Alert

