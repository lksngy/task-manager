const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')


// creating separate schema, that is by default happening behind the scenes => so we can use middleware to check 
// password before saving it.
// before putting it into userSchema, it was separate

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email in invalid')
            }
        }   
    },
    //just for now as a string:
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        lowercase: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error ('Password cannot include this word!')
            }
        }
    },
    age: {
        type: Number,
        default: null,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }
})

//needs to use normal function, not arrow one because of 'this' usage

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    console.log('just before saving') 

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User