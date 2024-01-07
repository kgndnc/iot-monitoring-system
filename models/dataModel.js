const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema(
	{
		sensor: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Sensor',
		},
		data: { type: mongoose.Schema.Types.Mixed, required: true },
		_data: new mongoose.Schema({
			metric: mongoose.Schema.Types.String,
			measurement: mongoose.Schema.Types.Number,
		}),
	},
	{
		timestamps: true,
	}
)

const Data = mongoose.model('Data', dataSchema, 'data')

module.exports = Data

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

