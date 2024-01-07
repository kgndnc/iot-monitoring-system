const mongoose = require('mongoose')

const configSchema = new mongoose.Schema(
	{
		min: {
			temperature: {
				unit: { type: String, default: 'Celsius' },
				value: { type: Number, default: -40 },
			},
			humidity: { value: { type: Number, default: 0.2 } },
			noise: {
				unit: { type: String, default: 'dB' },
				value: { type: Number, default: -1 },
			},
			light: {
				unit: { type: String, default: 'cd/m2' },
				value: { type: Number, default: -1 },
			},
		},
		max: {
			temperature: {
				unit: { type: String, default: 'Celsius' },
				value: { type: Number, default: 36 },
			},
			humidity: { value: { type: Number, default: 0.7 } },
			noise: {
				unit: { type: String, default: 'dB' },
				value: { type: Number, default: 65 },
			},
			light: {
				unit: { type: String, default: 'cd/m2' },
				value: { type: Number, default: 6.88e-4 },
			},
		},
		status: { type: String, default: 'up' },
	},
	{
		timestamps: true,
	}
)

// Add a static method to retrieve the single configuration document
configSchema.statics.getConfiguration = async function () {
	const config = await this.findOne()
	if (!config) {
		// If no configuration document exists, create one with default values
		return this.create({})
	}
	return config
}

const Config = mongoose.model('Config', configSchema, 'config')

module.exports = Config

