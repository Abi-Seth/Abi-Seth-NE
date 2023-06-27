import Joi from 'joi'

export const validateUser = user => {
    return Joi.object({
        email: Joi.string().email().required().min(5),
        password: Joi.string().required().min(8),
        confirmPassword: Joi.string().required().min(8),
    }).validate(user)
}

export const validateLoginData = account => {
    return Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        rememberMe: Joi.boolean().required()
    }).validate(account)
}