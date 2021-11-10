const express = require("express")
const morgan = require("morgan")
const path = require("path")
const mongoose = require("mongoose")

const app = express()
const config = require("./config")
const pagesRoutes = require("./routes/pages")
const usersRoutes = require("./routes/users")
const apiRoutes = require("./routes/api")
const corsHandler = require("./helpers/cors-handler")

mongoose.connect(config.MongoDBUri)

app.use(corsHandler)
app.use(express.urlencoded({extended: true, limit: '50mb'}))
app.use(express.json({limit: '50mb'}))
app.use(express.static('public'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/public/uikit', express.static(path.join(__dirname, 'node_modules','uikit','dist')))
app.use(morgan('combined'))
app.use("/", pagesRoutes)
app.use("/api/", apiRoutes)
app.use("/api/users/", usersRoutes)

module.exports = app