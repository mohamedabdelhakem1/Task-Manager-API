const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const auth = require('./middleware/auth')
const app = express()
const port = process.env.PORT 

app.use(express.json())
//users routes
app.use(userRouter)
//tasks  routes
app.use(taskRouter)
app.listen(port, () => {
    console.log('server is running on port ' + port);
})

