import { Router } from 'express'
import { createWeatherRecord, fetchWeatherRecords } from '../controllers'
const _weather_router = Router()

_weather_router.route('/')
    .post(createWeatherRecord)
    .get(fetchWeatherRecords)


export default _weather_router