require('../src/db/mongoose')
const User = require('../src/models/user')


//ObjectId("609c46082b3fab121402822c")

User.findByIdAndDelete('609c46082b3fab121402822c').then((user) => {
    console.log(user)
    return User.countDocuments({ age: 25})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})
