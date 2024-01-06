const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema(
	{
		sensor: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Sensor',
		},
		data: { type: mongoose.Schema.Types.Mixed, required: true },
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

