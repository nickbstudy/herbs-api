const mongoose = require('mongoose')
const { Schema } = mongoose;

const herbSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    expiry: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Herb', herbSchema)