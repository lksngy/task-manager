// to be deleted from the task-manager app - no longer needed

// CRUD operations => create, read , update, delete database entries

// mongodb npm driver
const mongodb = require('mongodb')
// getting access to the db functions to operate the CRUDs
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

// connection URL
const connectionURL = 'mongodb://127.0.0.1:27017'
// database to connect to
const databaseName = 'task-manager'

//// naming convention:
// database vs database
// table vs collection
// row/record vs document
// column vs field

//// Creating own IDs
// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())

// two arguments passed: 1- to parse url correctly, 2-callback function - to connect to the db - async operation 
MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to the database')
    }
    const db = client.db(databaseName)

    db.collection('users').deleteMany({
        age: 27
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    // // Update many - using promise
    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // // Updating documents using promise, not callback
    // db.collection('users').updateOne({
    //     _id: new ObjectID("60964d5e6db0dc8e1b339198")
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
    

    // // find one user
    // db.collection('users').findOne({ name: 'Jen'}, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(user)
    // })

    // // find all users 29 yo
    // db.collection('users').find({ age: 29}).toArray((error, users) => {
    //     console.log(users)
    // })

    // //first insert
    // db.collection('users').insertOne({
    //     name: 'Karel',
    //     age: 25
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result.insertedCount)

    // })

    ////second insert
    // db.collection('users').insertMany([{
    //     name: 'Jen',
    //     age: 28
    // }, {
    //     name: 'Guther',
    //     age: 27
    // }], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents')
    //     }
    //     console.log(result.ops)
    // })

    //// challenge to create a new collection and insert a few documents
    // db.collection('tasks').insertMany([{
    //     description: 'Learn basics of HTML, CSS, JS',
    //     completed: true
    // }, {
    //     description: 'Finish this udemy course',
    //     completed: false
    // }, {
    //     description: 'Create your own app - Feribot',
    //     completed: false
    // }], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents')
    //     }
    //     console.log(result.ops)
    // })

})