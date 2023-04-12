const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')

// @desc    Register new users
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {

    const {name, username, password} = req.body

    if (!name || !username || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExists = await User.findOne({username})

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        username,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            username: user.username,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})


// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public

const loginUser = asyncHandler(async (req, res) => {

    const { username, password } = req.body

    // Check for username
    const user = await User.findOne({username})

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            username: user.username,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})


// @desc    Get user data
// @route   GET /api/users/me
// @access  Private

const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
}) 


// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '90d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}