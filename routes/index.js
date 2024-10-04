const express = require('express')
const taskRouter = require('./tasks.router')

function routerApi(app) {
    const router = express.Router()
    app.use('/app/v1', router)
    router.use('/tasks', taskRouter)
}

module.exports = routerApi