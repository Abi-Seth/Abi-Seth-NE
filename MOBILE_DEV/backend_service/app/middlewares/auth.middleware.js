import jwt from 'jsonwebtoken'
import { AUTH_SECRET } from '../constants'
import { User } from '../models'

export default async function auth(req, res, next) {
    const token = req.header('Authorization')
    if (!token)
        return res.status(401).send({
            success: false,
            status: 401,
            message: 'Unauthorized! Please first login.'
        })

    try {
        const decoded_token = jwt.verify(token.split(' ')[1], AUTH_SECRET)

        if (!decoded_token)
            return res.status(401).send({
                success: false,
                status: 401,
                message: 'Invalid authorization details!'
            })

        const user = await User.findOne({ _id: decoded_token._id })
        if (!user)
            return res.status(404).send({
                success: false,
                status: 404,
                message: 'Invalid authorization details!'
            })
        req.user = user
        next()
    } catch (error) {
        res.status(401).send({
            success: false,
            status: 401,
            message: `Unauthorized: ${error.message || 'Something went wrong!'}`
        })
    }
}