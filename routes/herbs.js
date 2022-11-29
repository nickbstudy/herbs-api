const express = require('express')
const { getHerbs, addHerb, discardHerb, changeAmount } = require('../controllers/herbController')

const router = express.Router()

router.get('/', getHerbs)

router.post('/', addHerb)

router.delete('/:id', discardHerb)

router.patch('/:id', changeAmount)

module.exports = router