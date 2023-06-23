import fs from 'fs'
import path from 'path'
import cors from 'cors'
import express from 'express'
import { PORT } from './constants'
import { ConnectDatabase } from './config'
import { _user_router, _token_router } from './routes'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './docs/swagger.json'

const morgan = require('morgan')

// create express application instance
const app = express()
// connect mongo-db instance
ConnectDatabase()

app.use(cors())
// parse requests of content-type - application/json
app.use(express.json())
// parse requests of conten-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'logs/access.log')
)
app.use(morgan('combined', { stream: accessLogStream }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/public', express.static('public'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/v1/api/user', _user_router)
app.use('/v1/api/token', _token_router)

app.use('/', (req, res) => {
    return res.status(200).send({
        success: true,
        status: 200,
        message: 'Welcome to NE Mobile_Dev Service.'
    })
})

app.listen(PORT, () => {
    console.log(`[${new Date().toJSON()}] :: Server started on port ${PORT}!`);
})
