import { Client, Pool } from "pg"
import fs from 'fs'
import { DB_USER, DB_HOST, DATABASE, DB_PASSWORD, DB_PORT } from "../constants"

const pool = new Pool({
    user: `${DB_USER}`,
    host: `${DB_HOST}`,
    database: `${DATABASE}`,
    password: `${DB_PASSWORD}`,
    port: `${DB_PORT}`,
    ssl: {
        ca : fs.readFileSync('C:\\Users\\abc\\Desktop\\studies\\class\\Notes\\PRACTICAL_PREPARATION\\starter_projects\\backend_service_node\\app\\config\\RTB-EDS-ssl-public-cert.cert')
    }
});

const createDatabaseTables = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                role VARCHAR(20) NOT NULL CHECK (role IN ('ADMIN', 'STANDARD')),
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS equipments (
                id SERIAL PRIMARY KEY,
                firstName VARCHAR(255) NOT NULL,
                lastName VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                telephone VARCHAR(20) NOT NULL,
                nationalId VARCHAR(20) NOT NULL,
                position VARCHAR(255) NOT NULL,
                department VARCHAR(255) NOT NULL,
                model VARCHAR(255) NOT NULL,
                laptopManufacturer VARCHAR(255) NOT NULL,
                serialNumber VARCHAR(255) NOT NULL
            );
        `);
    } catch (error) {
        throw `Couldn't connect database: ${error.message || 'Something went wrong!'}`
    }
}

export const ConnectDatabase = async () => {
    try {
        console.debug(`[${new Date().toJSON()}] :: Initializing Database Relations . . .`)
        await createDatabaseTables()
        console.debug(`[${new Date().toJSON()}] :: Database Relation Instances Created`)
    } catch (error) {
        throw `Couldn't connect database: ${error.message || 'Something went wrong!'}`
    }
}

export { pool }
