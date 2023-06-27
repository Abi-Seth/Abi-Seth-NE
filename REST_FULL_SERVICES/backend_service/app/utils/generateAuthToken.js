import jwt from 'jsonwebtoken'
import { AUTH_SECRET } from '../constants'

export const generateAuthToken = (_id, remember_me) => {
    return jwt.sign({ _id }, AUTH_SECRET, {
        expiresIn: remember_me ? '30d' : '5h'
    })
}
