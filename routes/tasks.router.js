const express = require('express')
const TaskService = require('../services/tasks.service')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const data = await TaskService.getAll()
        res.json(data)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
})

router.post('/', (req, res, next) => {
    try {

    } catch(error) {
        next(error)
    }
})

router.patch('/:id', (req, res, next) => {
    try {

    } catch(error) {
        next(error)
    }
})

router.delete('/:id', (req, res, next) => {
    try {
        
    } catch(error) {
        next(error)
    }
})

module.exports = router