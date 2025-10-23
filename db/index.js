const mongoose = require("mongoose")

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log(`Connected to ${mongoose.connection.name} DB`)
  } catch (error) {
    console.error("Connection error", error.message)
  }
}

connect()

const db = mongoose.connection

module.exports = db
