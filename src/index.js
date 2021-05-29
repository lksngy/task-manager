const express = require('express')
const { restart } = require('nodemon')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000


//express for parsing JSON for us
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



// basic server
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
