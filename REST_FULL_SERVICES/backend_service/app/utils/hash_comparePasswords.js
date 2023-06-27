import bcrypt from 'bcryptjs'
import { HASH_SALT_LEN } from '../constants'

export const hashPassword = async password => {
    const salt = await bcrypt.genSalt(Number(HASH_SALT_LEN))
    return bcrypt.hash(password, salt)
}

export const comparePasswords = async (user_password, account_password) => {
    return bcrypt.compare(user_password, account_password)
}