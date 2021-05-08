// CRUD operations => create, read , update, delete database entries

// mongodb object
const mongodb = require('mongodb')
// getting access to the db functions to operate the CRUDs
const MongoClient = mongodb.MongoClient

// connection URL
const connectionURL = 'mongodb://127.0.0.1:27017'
// database to connect to
const databaseName = 'task-manager'


// two arguments passed: 1- to parse url correctly, 2-callback function - to connect to the db - async operation 
MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to the database')
    }
    console.log('Connected')
})