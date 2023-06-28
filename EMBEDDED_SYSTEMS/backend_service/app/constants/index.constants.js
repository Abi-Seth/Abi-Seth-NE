import { config } from 'dotenv'

config()

export const PORT = process.env.PORT || process.env.APP_PORT
export const DATABASE = process.env.APP_DATABASE