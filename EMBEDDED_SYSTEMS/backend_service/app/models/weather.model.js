import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const weatherSchema = new mongoose.Schema({
    device: {
        type: String,
        required: true,
        minLength: 3,
    },
    temperature: {
        type: Number,
        required: true,
    },
    humidity: {
        type: Number,
        required: true,
    }
}, { timestamps: true })
weatherSchema.plugin(mongoosePaginate)

const Weather = mongoose.model('Weather', weatherSchema)

export { Weather }