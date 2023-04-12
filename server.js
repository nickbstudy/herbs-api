const { json } = require('express')
const express = require('express')
require('dotenv').config()
const colors = require('colors')
const cors = require('cors')
const port = process.env.PORT || 5000
const mongoose = require('mongoose')
const { errorHandler } = require('./middleware/errorMiddleware')
const herbRoutes = require('./routes/herbs')
const userRoutes = require('./routes/users')
const connectDB = require('./config/db')

// start up express app
const app = express()

app.use(cors());

// middleware
// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use('/api/herbs', herbRoutes)
app.use('/api/users', userRoutes)

app.use(errorHandler)

// connect to DB

app.listen(port, () => console.log(`Server started on port ${port}`))

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         app.listen(process.env.PORT, () => {
//             console.log('connected to db & listening on port', process.env.PORT)
//         })
//     })
//     .catch((error) => {
//         console.log(error)
//     })


// listen for requests
connectDB()