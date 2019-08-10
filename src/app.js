const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

app.use(express.json())
//users routes
app.use(userRouter)
//tasks  routes
app.use(taskRouter)

module.exports = app