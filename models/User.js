const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    username: {
        type: String,
        required: [true, 'Please enter a username (without spaces)']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    }
})

module.exports = mongoose.model('User', userSchema)