import Joi from 'joi'

export const validateToken = data => {
    return Joi.object({
        amount: Joi.number()
            .min(100)
            .max(365 * 5 * 100).required(),
        meterNumber: Joi.string().required().min(6).max(6)
    }).validate(data)
}
