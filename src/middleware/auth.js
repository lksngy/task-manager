// register new express middleware to run it before running route handler; 
// we want to get from:
// new request => run route handler
// to:
// new request => do something => run route handler
// this way, we can put a 'blocker' between user and our server whenever and for whatever we want

const auth = async (req, res, next) => {
    console.log('testing middleware')
    next()
}


module.exports = auth



