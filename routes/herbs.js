const express = require('express')
const { getHerbs, addHerb, discardHerb, changeAmount } = require('../controllers/herbController')
const {protect} = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', protect, getHerbs)

router.post('/', protect, addHerb)

router.delete('/:id', protect, discardHerb)

router.patch('/:id', protect, changeAmount)

module.exports = router