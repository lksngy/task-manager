const express = require('express')
const { restart } = require('nodemon')
const Task = require('./models/task')
require('./db/mongoose')
const User = require('./models/user')

const app = express()
const port = process.env.PORT || 3000


//express for parsing JSON for us
app.use(express.json())

//// here are different routes handling user's action in the web browser

// route for creating and saving new user
app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }

})

// route handler for fetching multiple users
app.get('/users', async (req, res) => {
    
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

// route handler for fetching one user
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    console.log(req.params)
    
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }

    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         return res.status(404).send()
    //     }
    //     res.send(user)

    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

//route for creating and saving new task
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send()
    }

    // task.save().then(() => {
    //     console.log(task)
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

// route handler for fetching multiple tasks
app.get('/tasks', async (req, res) => {
    
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }

    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

// route handler for fetching one task
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }

    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //         return res.status(404).send()
    //     }

    //     res.send(task)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

// basic server
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
