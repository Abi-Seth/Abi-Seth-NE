import mongoose from 'mongoose'
// import mongoosePaginate from 'mongoose-paginate-v2'

const tokenSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    token: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 8
    },
    amount: {
        type: Number,
        required: true
    },
    token_value_days: {
        type: Number,
        default: 0,
        required: true
    },
    meter_number: {
        type: String,
        required: true,
        maxLength: 6,
        minLength: 6
    },
    purchased_date: {
        type: Date,
        required: true
    },
    token_status: {
        type: String,
        required: true,
        default: 'NEW',
        enum: ['USED', 'EXPIRED', 'NEW']
    },
}, { timestamps: true })

const Token = mongoose.model('purchased_tokens', tokenSchema)

export { Token }