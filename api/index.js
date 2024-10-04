const connectDB = require('./db/connect')
const express = require('express')
const routerApi = require('./routes')
const notFound = require('./middlewares/not-found')
const {errorHandler, logErrors} = require('./middlewares/error-handler')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static('./public'))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Welcome to task Manager")
})

routerApi(app)

app.use(notFound)
app.use(logErrors)
app.use(errorHandler)

async function startServer() {
    try {
        await connectDB()
        app.listen(port, () => console.log(`App listening to port ${port}`))
    } catch (error) {
        console.error('Error to starting the server: ', error)
    }
}

startServer()