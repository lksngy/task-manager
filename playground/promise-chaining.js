require('../src/db/mongoose')
const User = require('../src/models/user')


//ObjectId("609c329c0712b90dba588b49")

User.findByIdAndUpdate('609c329c0712b90dba588b49', { age: 27}).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 27})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})