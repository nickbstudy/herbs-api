const Herb = require('../models/Herb')
const User = require('../models/User')

// @desc    Get all herbs
// @route   GET /api/herbs
// @access  Private
const getHerbs = async (req, res) => {

    const herbs = await Herb.find( {user: req.user.id})
    res.status(200).json(herbs)

}

// @desc    Add a herb
// @route   POST /api/herbs
// @access  Private
const addHerb = async (req, res) => {
    const herbName = req.body.herbName
    const expiryDate = new Date(req.body.expiryDate)
    
    try {
        const createdHerb = await Herb.create({ name: herbName, expiry: expiryDate, user: req.user.id })
        res.status(200).json(createdHerb)    
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// @desc    Delete a herb
// @route   DELETE /api/herbs/:id
// @access  Private
const discardHerb = async (req, res) => {
    
    const herb = await Herb.findById(req.params.id)

    if (!herb) {
        return res.status(404).json({error: 'No such herb'})
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Check user is editing their own herbs only
    if(herb.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await herb.remove()

    res.status(200).json({id: req.params.id})


}

//PATCH - update herb amount
// @desc    Update herb amount
// @route   PATCH /api/herbs/:id
// @access  Private
const changeAmount = async (req, res) => {
    
    const herb = await Herb.findById(req.params.id)

    if (!herb) {
        return res.status(404).json({error: 'No such herb'})
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Check user is editing their own herbs only
    if(herb.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedHerb = await Herb.findOneAndUpdate({_id: req.params.id}, {amount: req.body.newAmount}, {new: true})

    res.status(200).json(updatedHerb)

}

module.exports = { getHerbs, addHerb, discardHerb, changeAmount }