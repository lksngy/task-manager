require('../src/db/mongoose')
const Task = require('../src/models/task')


// //ObjectId("609c46082b3fab121402822c")

// User.findByIdAndDelete('609c46082b3fab121402822c').then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 25})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })


const deleteTaskAndCount = async (id, completed) => {
    const task = Task.findByIdAndDelete(id)
    const count = Task.countDocuments({completed : false})
    console.log('You are searching ' + task + ' and the total count is ' + count)
    return count
}

deleteTaskAndCount('60ad53dbd82aa553c4a10a38').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})

