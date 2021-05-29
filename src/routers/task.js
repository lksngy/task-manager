const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

//route for creating and saving new task (C)
router.post('/tasks', async (req, res) => {
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

// route handler for fetching multiple tasks (R)
router.get('/tasks', async (req, res) => {
    
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

// route handler for fetching one task (R)
router.get('/tasks/:id', async (req, res) => {
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

// route handler for updating one task (U)
router.patch('/tasks/:id', async (req, res) => {

//// VALIDATION EXAMPLE AS FOR THE USER => PROBABLY NOT A BEST PRACTICE, BUT BETTER THAN NOTHING
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates of the Task!'})
    }
    
    try {
        const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true})
        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(400).send( { error: 'Not good!'})
    }
})

// route handler for deleting one task (D)
router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findByIdAndDelete(_id)
        if (!task) {
            res.status(404).send()
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router