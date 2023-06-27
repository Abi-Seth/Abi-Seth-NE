import { Router } from 'express'
import { createEmployeeRecord, fetchEmployeeRecords } from '../controllers'
import { admin } from '../middlewares'

const _employee_router = Router()

_employee_router.route('/')
    .post([admin, createEmployeeRecord])
    .get([admin, fetchEmployeeRecords])

export default _employee_router