require('../src/db/mongoose')
const User = require('../src/models/user')


// //ObjectId("609c329c0712b90dba588b49")

// User.findByIdAndUpdate('609c329c0712b90dba588b49', { age: 27}).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 27})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

// same thing, using async/await

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age})
    console.log('Age updated')
    return count
}

updateAgeAndCount('609c329c0712b90dba588b49', 25).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})