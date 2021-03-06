const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')


/// here are different routes handling user's action in the web browser - CRUD operations

// route for creating and saving new user (C)
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        user.tokens = user.tokens.concat({ token})
        await user.save()
        res.status(201).send({user, token })
    } catch (e) {
        res.status(400).send(e)
    }

})

// route handler for login of the user
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        user.tokens = user.tokens.concat({ token})
        await user.save()

        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }

})

// route handler to logout a session
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        req.send()
    } catch (e) {
        res.status(500).send()
    }
})

// route handler to logout from all sessions
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        req.send()
    } catch (e) {
        res.status(500).send()
    }
})

// route handler for fetching data about the user
router.get('/users/me', auth, async (req, res) => {
    
    res.send(req.user)

    // try {
    //     const users = await User.find({})
    //     res.send(users)
    // } catch (e) {
    //     res.status(500).send()
    // }

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

// route handler for fetching one user (R)
router.get('/users/:id', async (req, res) => {
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

//route handler for updating one user (U)
router.patch('/users/:id', async (req, res) => {

    //// VALIDATION OF UPDATES CAN BE DONE IN MANY DIFFERENT WAYS. 
    //// WE CAN VALIDATE JSON DATA RECEIVING BEFORE WE DO ANYTHING WITH IT.
    //// APPROACH BELOW IS JUST ONE WAY OF DOING THINGS.
    //// ANY UPDATE IN DB WOULD HAVE TO BE MANUALLY CHANGED HERE...

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))


    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        const user = await User.findById(req.params.id)
        console.log(user)

        updates.forEach((update) => user[update] = req.body[update])
        console.log(user)
        await user.save()   

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)

    } catch (e) {
        res.status(400).send({ error: 'What are you trying to do?'})
    }
})

// route for deleting user (D)
router.delete('/users/:id', async (req, res) =>{
    const _id = req.params.id

    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            res.status(404).send({ error: 'User not found!'})
        }
        
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router