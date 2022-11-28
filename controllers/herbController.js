const Herb = require('../models/Herb')
const mongoose = require('mongoose')

// GET - get all herbs
const getHerbs = async (req, res) => {
    try {
        const allHerbs = await Herb.find({}).sort({name: 1})
        res.status(200).json(allHerbs)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// POST - add a herb
const addHerb = async (req, res) => {
    const herbName = req.body.herbName
    const expiryDate = new Date(req.body.expiryDate)
    
    try {
        const createdHerb = await Herb.create({ name: herbName, expiry: expiryDate})
        res.status(200).json(createdHerb)    
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE - delete a herb
const discardHerb = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such herb'})
    }

    const herb = await Herb.findOneAndDelete({_id: id})

    if (!herb) {
        return res.status(404).json({error: 'No such herb'})
    }

    res.status(200).json(herb)

}

module.exports = { getHerbs, addHerb, discardHerb }