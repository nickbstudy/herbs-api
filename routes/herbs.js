const express = require('express')
const { getHerbs, addHerb, discardHerb } = require('../controllers/herbController')

const router = express.Router()

router.get('/', getHerbs)

router.post('/', addHerb)

router.delete('/:id', discardHerb)

module.exports = router