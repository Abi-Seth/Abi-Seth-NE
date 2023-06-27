import Joi from 'joi'
import { NationalIdPattern, PhoneRegex } from '../constants'

export const validateEmployeeRecord = record => {
    return Joi.object({
        firstName: Joi.string().min(3).max(60).required(),
        lastName: Joi.string().min(2).max(25).required(),
        email: Joi.string().email().required().min(5),
        position: Joi.string().required().min(2),
        department: Joi.string().required().min(2),
        telephone: Joi.string().required().pattern(PhoneRegex).min(10).max(10),
        nationalId: Joi.string().required().pattern(NationalIdPattern).min(16).max(16),
        laptopManufacturer: Joi.string().required().min(2),
        model: Joi.string().required().min(2),
        serialNumber: Joi.string().required().min(2),
    }).validate(record)
}
