import { config } from 'dotenv'

config()

export const PORT = process.env.PORT || process.env.APP_PORT
export const DB_USER = process.env.DB_USER
export const DB_HOST = process.env.DB_HOST
export const DATABASE = process.env.DATABASE
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_PORT = process.env.DB_PORT
export const AUTH_SECRET = process.env.APP_AUTH_SECRET
export const HASH_SALT_LEN = process.env.APP_HASH_SALT_LEN