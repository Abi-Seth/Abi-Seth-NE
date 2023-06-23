import { Router } from 'express'
import { createUser, fetchUsers, getCurrentUser, login } from '../controllers'
import { auth, admin } from '../middlewares'

const _user_router = Router()

_user_router.route('/')
    .post([admin, createUser])
    .get([admin, fetchUsers])

_user_router.route('/current')
    .get([auth, getCurrentUser])

_user_router.route('/login')
    .post(login)

export default _user_router