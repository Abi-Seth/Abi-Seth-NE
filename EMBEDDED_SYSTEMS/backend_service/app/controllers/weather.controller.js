import _ from 'lodash'
import { validateWeatherData } from '../validators'
import { organiseStrings } from '../utils'
import { Weather } from '../models'

const createWeatherRecord = async (req, res) => {
    try {
        const validWeatherRecord = await validateWeatherData(req.body)
        if (validWeatherRecord.error)
            return res.status(400).send({
                success: false,
                status: 400,
                message: organiseStrings(validWeatherRecord.error.details[0].message)
            })

        const newWeatherRecord = new Weather(_.pick(req.body, ['device', 'temperature', 'humidity']))
        await newWeatherRecord.save()
            .then(() => {
                res.status(201).send({
                    success: true,
                    status: 201,
                    message: 'Record created successfully.',
                    data: newWeatherRecord
                })
            }).catch((err) => {
                res.status(400).send({
                    success: false,
                    status: 400,
                    message: organiseStrings(err.message)
                })
            })
    } catch (error) {
        res.status(400).send({
            success: false,
            status: 400,
            message: organiseStrings(error.message)
        })
    }
}

const fetchWeatherRecords = async (req, res) => {
    try {
        let {
            size: limit,
            start :page
        } = req.query;

        if (!page || page < 0) page = 1
        if (!limit || limit < 0) limit = 100

        const options = {
            page,
            limit
        }

        let data = await Weather.paginate({}, options)
        data = JSON.parse(JSON.stringify(data))

        res.status(200).send({
            success: true,
            status: 200,
            message: 'Weather records registered',
            data: data
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            status: 400,
            message: organiseStrings(error.message)
        })
    }
}

export {
    createWeatherRecord,
    fetchWeatherRecords
}