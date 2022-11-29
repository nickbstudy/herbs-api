require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const herbRoutes = require('./routes/herbs')


// start up express app
const app = express()

// middleware
app.use(cors())
app.use(express.json())

// routes
app.use('/api/herb', herbRoutes)


// connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

// listen for requests