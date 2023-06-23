import _ from 'lodash'
import {
    validateUser,
    validateLoginData
} from '../validators'
import {
    hashPassword,
    comparePasswords,
    organiseStrings,
    generateAuthToken,
    generateUniqueRandomDigits
} from '../utils'
import { User } from '../models'

const createUser = async (req, res) => {
    try {
        const isAdmin = req.body.isAdmin
        delete req.body.isAdmin

        const validUser = await validateUser(req.body)
        if (validUser.error)
            return res.status(400).send({
                success: false,
                status: 400,
                message: organiseStrings(validUser.error.details[0].message)
            })

        let { email } = req.body
        let user = await User.findOne({
            $or: [
                { email }
            ]
        })

        if (user) {
            return res.status(400).send({
                success: false,
                status: 400,
                message: `
                    User with email address already exist!
                `
            })
        }

        req.body.password = await hashPassword(req.body.password)

        isAdmin ? req.body.role = 'ADMIN' : 'STANDARD'
        req.body.meterNumber = await generateUniqueRandomDigits(6)
        console.log(req.body.meterNumber)

        const newUser = new User(_.pick(req.body, ['names', 'email', 'password', 'role', 'meterNumber']))
        await newUser.save()
            .then(() => {
                res.status(201).send({
                    success: true,
                    status: 201,
                    message: 'User created successfully.',
                    data: {
                        "names": newUser.names,
                        "email": newUser.email,
                        "role": newUser.role,
                        "meterNumber": newUser.meterNumber,
                        "createdAt": newUser.createdAt,
                        "updatedAt": newUser.updatedAt,
                        "__v": newUser.__v,
                        "_id": newUser._id
                    }
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

const fetchUsers = async (req, res) => {
    try {
        let {
            size: limit,
            start :page
        } = req.query;

        if (!page || page < 0) page = 1
        if (!limit || limit < 0) limit = 6

        const options = {
            page,
            limit
        }

        let data = await User.paginate({}, options)
        data = JSON.parse(JSON.stringify(data))
        data.docs = data.docs.map(user => ({
            "names": user.names,
            "email": user.email,
            "role": user.role,
            "createdAt": user.createdAt,
            "updatedAt": user.updatedAt,
            "__v": user.__v,
            "_id": user._id
        }))

        res.status(200).send({
            success: true,
            status: 200,
            message: 'User accounts registered',
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

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById({
            _id: req.user._id
        })

        if (!user){
            return res.status(404).send({
                success: false,
                status: 404,
                message: "User not found!"
            })
        }

        var user_data = {
            "names": user.names,
            "email": user.email,
            "role": user.role,
            "createdAt": user.createdAt,
            "updatedAt": user.updatedAt,
            "__v": user.__v,
            "_id": user._id
        }

        return res.status(200).send({
            success: true,
            status: 200,
            message: "User found.",
            data: user_data
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            status: 400,
            message: organiseStrings(error.message)
        })
    }
}

const login = async (req, res) => {
    try {
        const validAccount = await validateLoginData(req.body)
        if (validAccount.error)
            return res.status(400).send({
                success: false,
                status: 400,
                message: organiseStrings(validAccount.error.details[0].message)
            })

        const user = await User.findOne({ email: req.body.email })
        if (!user)
            return res.status(404).send({
                success: false,
                status: 404,
                message: 'Invalid email or password!'
            })

        const validPassword = await comparePasswords(req.body.password, user.password)
        if (!validPassword)
            return res.status(404).send({
                success: false,
                status: 404,
                message: 'Invalid email or password!'
            })

        const token = generateAuthToken(user._id, req.body.rememberMe)
        res.status(200).send({
            success: true,
            status: 200,
            message: 'You are logged in.',
            data: { token }
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
    createUser,
    fetchUsers,
    getCurrentUser,
    login,
}