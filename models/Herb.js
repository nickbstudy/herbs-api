const mongoose = require('mongoose')

const herbSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please enter a name for the herb']
    },
    expiry: {
        type: Date,
        required: [true, 'Please enter an expiry date']
    },
    amount: {
        type: Number,
        required: true,
        default: 100
    }
})

module.exports = mongoose.model('Herb', herbSchema)