require('dotenv').config()
const mongoose = require("mongoose");

const connectionString = process.env.MONGO_URI

async function connectToDb() {
    try {
        await mongoose.connect(connectionString)
        console.log('Connected to DB...')
    } catch (err) {
        console.error(err)
    }
} 

module.exports = connectToDb