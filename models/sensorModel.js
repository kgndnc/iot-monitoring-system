const mongoose = require('mongoose')

const sensorSchema = new mongoose.Schema(
	{
		sensor_type: {
			type: String,
			required: true,
			enum: ['Temperature', 'Humidity', 'Noise', 'Light', 'AirQuality'],
		},
		location: {
			latitude: { type: Number },
			longitude: { type: Number },
		},
		timestamp: { type: mongoose.Schema.Types.Date, default: Date.now() },
		measurement_value: { type: Number },
		unit_of_measurement: { type: String, required: true },
		status: { type: String, enum: ['Online', 'Offline'], default: 'Online' },
		manufacturer: { type: String },
		model: { type: String },
		calibration: {
			last_calibration_date: { type: Date },
			calibration_schedule: { type: String },
		},
		power_source: { type: String },
		communication_protocol: { type: String },
		range: {
			min: { type: Number },
			max: { type: Number },
		},
		resolution: { type: Number },
		accuracy: { type: Number },
		environmental_conditions: {
			operating_temperature: {
				min: { type: Number },
				max: { type: Number },
			},
			operating_humidity: {
				min: { type: Number },
				max: { type: Number },
			},
		},
		data_quality_flags: [{ type: String }],
		maintenance_history: [
			{
				date: { type: Date },
				activity: { type: String },
			},
		],
		firmware_version: { type: String },
		custom_metadata: { type: mongoose.Schema.Types.Mixed }, // Mixed type for flexibility
	},

	{
		timestamps: true,
	}
)

sensorSchema.virtual('sensor_id').get(function () {
	return this._id
})

const Sensor = mongoose.model('Sensor', sensorSchema)

module.exports = Sensor

/*
const _sensorSchema = mongoose.Schema(
	{
		// user: {
		//   type: mongoose.Schema.Types.ObjectId,
		//   required: true,
		//   ref: 'User',
		// },
		sensor_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)
*/

