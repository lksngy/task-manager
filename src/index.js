const express = require('express')
const { restart } = require('nodemon')
const Task = require('./models/task')
require('./db/mongoose')
const User = require('./models/user')

const app = express()
const port = process.env.PORT || 3000


//express for parsing JSON for us
app.use(express.json())

// route for creating and saving new user
app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

// route handler for fetching multiple users
app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send()
    })
})

// route handler for tetching one user
app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)

    }).catch((e) => {
        res.status(500).send()
    })
})

//route for creating and saving new task
app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        console.log(task)
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

// route handler for fetching multiple tasks
app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((e) => {
        res.status(500).send()
    })
})

// route handler for fetching one task
app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id

    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    }).catch((e) => {
        res.status(500).send()
    })
})

// basic server
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
