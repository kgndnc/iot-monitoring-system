const Data = require('../models/dataModel')

// @method  GET
// @route   /analytics
// @access  public
// @desc    Retrieve analytics or aggregated data for a specific metric
const getAnalyticsData = async (req, res) => {
	/**
	 * @type {{metric: string}}
	 */
	let { metric } = req.params

	metric = metric.at(0).toUpperCase() + metric.substring(1)

	const data = await Data.find({ 'data.type': metric })

	const {
		count,
		sum,
		mean,
		median,
		min,
		max,
		variance,
		standard_deviation,
		range,
	} = calculateStats(data)

	// Implement logic to retrieve analytics data for the specified metric
	res.json({
		metric,
		analytics: {
			count,
			sum,
			mean,
			median,
			min,
			max,
			variance,
			standard_deviation,
			range,
		},
	})
}

function calculateStats(data) {
	const count = data.length
	let sum = 0
	let median
	let min = Number.MAX_VALUE
	let max = Number.MIN_VALUE

	const dataArray = data
		.map(data => data.data)
		.sort((a, b) => a.measurement - b.measurement)

	for (let i = 0; i < dataArray.length; i++) {
		const entry = dataArray[i].measurement
		sum += entry

		if (entry < min) min = entry
		if (entry > max) max = entry
	}

	const mean = sum / count

	// calculate std. deviation

	let totalDeviation = 0

	for (let i = 0; i < dataArray.length; i++) {
		const entry = dataArray[i].measurement

		const deviation = Math.pow(entry - mean, 2)

		totalDeviation += deviation
	}
	const variance = totalDeviation / count
	const standard_deviation = Math.sqrt(variance)

	// calculate median
	if (count % 2 === 0) {
		// even

		let md_1 = count / 2 - 1
		let md_2 = count / 2

		median = (dataArray[md_1].measurement + dataArray[md_2].measurement) / 2
	} else {
		// odd
		let medianIdx = Math.floor(count / 2)
		median = dataArray[medianIdx].measurement
	}

	console.log({ count, sum, mean, median, min, max })

	return {
		count,
		sum,
		mean,
		median,
		min,
		max,
		variance,
		standard_deviation,
		range: max - min,
	}
}

// TODO: Add quartiles
// Sorted data: -40.4, -10.7, -1.2, 12.6,|| 15.4, 21.2, 37.1, 52.4

module.exports = { getAnalyticsData }

