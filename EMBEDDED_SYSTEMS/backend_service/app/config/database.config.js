import mongoose from "mongoose"
import { DATABASE } from "../constants"

export const ConnectDatabase = async () => {
    try {
        console.debug(`[${new Date().toJSON()}] :: Initializing Database . . .`)
        await mongoose.connect(DATABASE, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
            .then(
                () => console.debug(`[${new Date().toJSON()}] :: Database Instance Connected`))
            .catch(
                error => `Couldn't Connect Database: ${error.message || 'Something went wrong!'}`)
    } catch (error) {
        throw `Couldn't connect database: ${error.message || 'Something went wrong!'}`
    }
}