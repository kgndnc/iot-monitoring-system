const express = require('express')

const app = express()
const PORT = 3000

app.use(express.json())

app.use('/sensors', require('./routes/sensorRoutes'))
app.use('/data', require('./routes/dataRoutes'))
app.use('/process', require('./routes/processRoutes'))
app.use('/analytics', require('./routes/analyticsRoutes'))
app.use('/alerts', require('./routes/alertRoutes'))
app.use('/config', require('./routes/configRoutes'))

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}...`)
})

