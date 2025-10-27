const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()
const PORT = process.env.PORT || 3001

const db = require("./db")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan("dev"))
app.use("/public/images", express.static("./public/images"))

// Routers

const authRouter = require("./routes/authRouter")
app.use("/auth", authRouter)

const userRouter = require("./routes/userRouter")
app.use("/profile", userRouter)

const enrollmentRouter = require("./routes/enrollmentRouter")
app.use("/enrollments", enrollmentRouter)

const courseRouter = require("./routes/courseRouter")
app.use("/courses", courseRouter)

app.listen(PORT, () => {
  console.log(`Express Server Running on Port`, PORT, `. . .`)
})
