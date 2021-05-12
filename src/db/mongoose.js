const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
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
        minLenght: 7,
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

const me = new User({
    name: 'Anna',
    email: 'anna@email.cz',
    password: 'kAmIlEk',
    age: 25
})

me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log('Error!', error)
})

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const coding = new Task({
    description: 'Do not eat sugar',
    completed: true
})

coding.save().then(() => {
    console.log(coding)
}).catch((error) => {
    console.log('Error!', error)
})