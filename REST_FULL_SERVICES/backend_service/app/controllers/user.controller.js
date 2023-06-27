import _ from 'lodash'
import {
    validateUser,
    validateLoginData,
} from '../validators'
import {
    hashPassword,
    comparePasswords,
    organiseStrings,
    generateAuthToken
} from '../utils'
import { pool } from '../config/database.config'

const createUser = async (req, res) => {
    try {
        const isAdmin = req.body.isAdmin;
        delete req.body.isAdmin;
    
        const validUser = await validateUser(req.body);
        if (validUser.error) {
            return res.status(400).send({
                success: false,
                status: 400,
                message: organiseStrings(validUser.error.details[0].message),
            });
        }
    
        let { email, password, confirmPassword } = req.body;
        if (password != confirmPassword) {
            return res.status(400).send({
                success: false,
                status: 400,
                message: 'Passwords not matching!',
            });
        }
    
        // Check if user already exists
        const query = `
            SELECT * FROM users
            WHERE email = $1
        `;
        const result = await pool.query(query, [email]);
    
        if (result.rows.length > 0) {
            return res.status(400).send({
                success: false,
                status: 400,
                message: `
                    User with email address ${email}
                    already exists!
                    `.replace(/\n/g, '').replace(/\s+/g, ' ').trim(),
            });
        }
    
        req.body.password = await hashPassword(req.body.password);
    
        req.body.role = isAdmin ? 'ADMIN' : 'STANDARD';
    
        const newUserColumns = ['email', 'password', 'role'];
        const newUserValues = newUserColumns.map((col) => req.body[col]);
    
        const insertQuery = `
            INSERT INTO users (${newUserColumns.join(', ')})
            VALUES (${newUserValues.map((_, i) => `$${i + 1}`).join(', ')})
            RETURNING *
        `;
    
        const insertedUser = await pool.query(insertQuery, newUserValues);
        const newUser = insertedUser.rows[0];
    
        res.status(201).send({
            success: true,
            status: 201,
            message: 'User created successfully.',
            data: _.pick(newUser, [
                'email',
                'role',
                'id',
            ]),
        });
    } catch (error) {
        res.status(400).send({
        success: false,
        status: 400,
        message: organiseStrings(error.message),
        });
    }
}

const fetchUsers = async (req, res) => {
    try {
        let { size: limit, start: page } = req.query;
    
        if (!page || page < 0) page = 1;
        if (!limit || limit < 0) limit = 6;
    
        const offset = (page - 1) * limit;
    
        const query = `
            SELECT
                email,
                role,
                id
            FROM users
            LIMIT $1 OFFSET $2
        `;
    
        const result = await pool.query(query, [limit, offset]);
        const users = result.rows;
    
        res.status(200).send({
            success: true,
            status: 200,
            message: 'User accounts registered',
            data: users,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            status: 400,
            message: organiseStrings(error.message),
        });
    }
}

const getCurrentUser = async (req, res) => {
    try {
        const query = `
            SELECT
                email,
                role,
                id
            FROM users
            WHERE email = $1
        `;
    
        const result = await pool.query(query, [req.user.email]);
        const user = result.rows[0];
    
        if (!user) {
            return res.status(404).send({
                success: false,
                status: 404,
                message: "User not found!",
            });
        }
    
        return res.status(200).send({
            success: true,
            status: 200,
            message: "User found.",
            data: user,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            status: 400,
            message: organiseStrings(error.message),
        });
    }
}

const login = async (req, res) => {
    try {
        const validAccount = await validateLoginData(req.body);
        if (validAccount.error) {
            return res.status(400).send({
                success: false,
                status: 400,
                message: organiseStrings(validAccount.error.details[0].message),
            });
        }
    
        const query = `
            SELECT *
            FROM users
            WHERE email = $1
        `;
    
        const result = await pool.query(query, [req.body.email]);
        const user = result.rows[0];
    
        if (!user) {
            return res.status(401).send({
                success: false,
                status: 401,
                message: 'Invalid email or password!',
            });
        }
    
        const validPassword = await comparePasswords(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).send({
                success: false,
                status: 401,
                message: 'Invalid email or password!',
            });
        }
    
        const token = generateAuthToken(user.id, req.body.rememberMe);
        res.status(200).send({
            success: true,
            status: 200,
            message: 'You are logged in.',
            data: { token },
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            status: 500,
            message: organiseStrings(error.message),
        });
    }
}

export {
    createUser,
    fetchUsers,
    getCurrentUser,
    login,
}