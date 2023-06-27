import jwt from 'jsonwebtoken'
import { AUTH_SECRET } from '../constants'
import { pool } from '../config/database.config'

export default async function admin(req, res, next) {
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

        const result = await pool.query('SELECT * FROM users WHERE id = $1 LIMIT 1', [decoded_token._id]);
        if (result.rows.length === 0) {
            return res.status(404).send({
                success: false,
                status: 404,
                message: 'Invalid authorization details!'
            });
        }
        if (result.rows[0].role != 'ADMIN')
            return res.status(403).send({
                success: false,
                status: 403,
                message: 'You are not authorized to perform this action!'
            })
        req.user = result.rows[0]
        next()
    } catch (error) {
        res.status(401).send({
            success: false,
            status: 401,
            message: `Unauthorized: ${error.message || 'Something went wrong!'}`
        })
    }
}