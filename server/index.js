const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config();
const helmet = require("helmet")
const morgan = require("morgan")
const colors = require('colors')
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")

var app = express()

var cors = require('cors');
app.use(cors());

const connectDB = async () => {
    try {
        const conn =await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB Connected : ${conn.connection.host}`.cyan.underline)
    } catch(error) {
        console.log(error)
        process.exit()
    }
}

connectDB()

app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)


app.listen(5000, () => {
    console.log("Backend server is running")
})