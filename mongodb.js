// CRUD operations => create, read , update, delete database entries

// mongodb npm driver
const mongodb = require('mongodb')
// getting access to the db functions to operate the CRUDs
const MongoClient = mongodb.MongoClient

// connection URL
const connectionURL = 'mongodb://127.0.0.1:27017'
// database to connect to
const databaseName = 'task-manager'

//// naming convention:
// database vs database
// table vs collection
// row/record vs document
// column vs field

// two arguments passed: 1- to parse url correctly, 2-callback function - to connect to the db - async operation 
MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to the database')
    }
    const db = client.db(databaseName)

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