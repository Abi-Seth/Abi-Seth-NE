import { config } from 'dotenv'

config()

export const PORT = process.env.PORT || process.env.APP_PORT
export const DATABASE = process.env.APP_DATABASE
export const AUTH_SECRET = process.env.APP_AUTH_SECRET
export const HASH_SALT_LEN = process.env.APP_HASH_SALT_LEN