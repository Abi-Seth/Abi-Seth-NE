import _ from 'lodash'
import { validateToken } from '../validators'
import {
    organiseStrings,
    generateUniqueRandomDigits,
    checkElectricityTokenValidity
} from '../utils'
import { User } from '../models'
import { Token } from '../models'

const buyToken = async (req, res) => {
    try {
        const validateTokenData = await validateToken(req.body)
        if (validateTokenData.error)
            return res.status(400).send({
                success: false,
                status: 400,
                message: organiseStrings(validateTokenData.error.details[0].message)
            })

        let user = await User.findOne({ meterNumber: req.body.meterNumber })

        if (!user) {
            return res.status(400).send({
                success: false,
                status: 400,
                message: 'No users associated with meter number!'
            })
        }
        if (req.body.amount < 100) {
            return res.status(400).send({
                success: false,
                status: 400,
                message: 'Amount should not be less than 100 Rwf!'
            })
        }
        if ((req.body.amount / 100) > (365 * 5 * 100)) {
            return res.status(400).send({
                success: false,
                status: 400,
                message: 'Electricity token cannot have a valid period over 5 years!'
            })
        }

        req.body.numberOfDays = req.body.amount / 100
        req.body.token = generateUniqueRandomDigits(8)

        const tokenData = {
            id: Number(generateUniqueRandomDigits(11)),
            meter_number: req.body.meterNumber,
            token_value_days: req.body.numberOfDays,
            purchased_date: new Date(),
            token: req.body.token,
            amount: req.body.amount,
        }

        const newToken = new Token(_.pick(tokenData, [
            'id',
            'meter_number',
            'token',
            'token_value_days',
            'purchased_date',
            'amount'
        ]))
        await newToken.save()
            .then(() => {
                res.status(201).send({
                    success: true,
                    status: 201,
                    message: 'Token paid successfully.',
                    data: newToken
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

const checkTokens = async (req, res) => {
    try {
        const meter_number_id = req.params.meter_number

        let user = await User.findOne({ meterNumber: meter_number_id })

        if (!user) {
            return res.status(400).send({
                success: false,
                status: 400,
                message: 'No users associated with meter number!'
            })
        }

        const tokens = await Token.find({ meter_number: meter_number_id }).sort({ _id: 1 })
        res.status(201).send({
            success: true,
            status: 201,
            message: 'All tokens on this meter number.',
            data: tokens
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            status: 400,
            message: organiseStrings(error.message)
        })
    }
}

const validateTokenExpiry = async (req, res) => {
    try {
        const token_id = req.params.token_id

        let token = await Token.findOne({ token: token_id })

        if (!token) {
            return res.status(400).send({
                success: false,
                status: 400,
                message: 'Invalid token provided!'
            })
        }

        const { days, valid } = checkElectricityTokenValidity(
            token.purchased_date,
            token.token_value_days,
            new Date()
        )
        const tokenInfo = {
            ...token._doc,
            tokenStatus: token.token_status,
            tokenDescription: valid ? 'This token is still Valid and Active' :
                'This token is expired and cannot be used',
        }
        if (days >= 0) {
            tokenInfo.remainingLightingDays = `${Math.floor(days)} day(s)`
        }

        res.status(200).send({
            success: true,
            status: 200,
            message: 'Token Details.',
            data: tokenInfo
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
    buyToken,
    checkTokens,
    validateTokenExpiry
}