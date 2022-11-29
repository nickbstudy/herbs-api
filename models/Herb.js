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
    },
    amount: {
        type: Number,
        required: true,
        default: 100
    }
})

module.exports = mongoose.model('Herb', herbSchema)