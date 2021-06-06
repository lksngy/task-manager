// register new express middleware to run it before running route handler; 
// we want to get from:
// new request => run route handler
// to:
// new request => do something => run route handler
// this way, we can put a 'blocker' between user and our server whenever and for whatever we want

const jwt = require('jsonwebtoken')
const User = require('../models/user')

// middleware to autenticate token send by the user => this can be then used in routes for authentication
const auth = async (req, res, next) => {
    try {
        //look for the header with token
        const token = req.header('Authorization').replace('Bearer ', '')
        // valide the header
        const decoded = jwt.verify(token, 'thisismynewcourse')
        // find associated user
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})

        if (!user) {
            throw new Error()
        }
        req.user = user
        next()
        console.log(token)


    } catch (e) {
        res.status(401).send({ error: 'Please autenticae'})
    }
}


module.exports = auth



