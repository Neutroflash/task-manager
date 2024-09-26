const connectDB = require('./db/connect')
const express = require('express')
const routerApi = require('./routes')

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())

app.get("/", (req, res) => {
    res.send("Welcome to task Manager")
})

routerApi(app)

async function startServer() {
    try {
        await connectDB()
        app.listen(port, () => console.log(`App listening to port ${port}`))
    } catch (error) {
        console.error('Error to starting the server: ', error)
    }
}

startServer()