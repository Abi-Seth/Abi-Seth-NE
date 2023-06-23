import { string } from 'joi'
import mongoose from 'mongoose'
// import mongoosePaginate from 'mongoose-paginate-v2'

const userSchema = new mongoose.Schema({
    names: {
        type: String,
        required: true,
        minLength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'STANDARD',
        enum: ['ADMIN', 'STANDARD']
    },
    meterNumber: {
        type: String,
        required: true,
        maxLength: 6,
        minLength: 6
    }
}, { timestamps: true })
// userSchema.plugin(mongoosePaginate)

const User = mongoose.model('User', userSchema)

export { User }