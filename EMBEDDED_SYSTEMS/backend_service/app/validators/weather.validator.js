import Joi from 'joi'

export const validateWeatherData = user => {
    return Joi.object({
        device: Joi.string().min(3).required(),
        temperature: Joi.number().required(),
        humidity: Joi.number().required(),
    }).validate(user)
}