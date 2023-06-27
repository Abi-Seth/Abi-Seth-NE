import _ from 'lodash'
import { validateEmployeeRecord } from '../validators'
import { organiseStrings } from '../utils'
import { pool } from '../config/database.config'

const createEmployeeRecord = async (req, res) => {
    try {
        const validEmployeeRecord = await validateEmployeeRecord(req.body);
        if (validEmployeeRecord.error) {
            return res.status(400).send({
                success: false,
                status: 400,
                message: organiseStrings(validEmployeeRecord.error.details[0].message),
            });
        }
    
        let { nationalId, telephone, email, serialNumber } = req.body;
    
        // Check if record already exists
        const query = `
            SELECT * FROM equipments
            WHERE nationalId = $1 OR email = $2 OR telephone = $3 OR serialNumber = $4
        `;
        const result = await pool.query(query, [nationalId, telephone, email, serialNumber]);
    
        if (result.rows.length > 0) {
            const existingRecord = result.rows[0];
            const emailFound = existingRecord.email === email;
            const phoneFound = existingRecord.telephone === telephone;
            const nationalIdFound = existingRecord.nationalId === nationalId;
            const serialNumberFound = existingRecord.serialNumber === serialNumber;
        
            return res.status(400).send({
                success: false,
                status: 400,
                message: `
                    Record with 
                    ${
                        emailFound ? email + (nationalIdFound || phoneFound ? ', ' : '') : ''
                    }
                    ${phoneFound ? telephone + (serialNumberFound ? ', ' : '') : ''}
                    ${serialNumberFound ? serialNumber + (nationalIdFound ? ', ' : '') : ''}
                    ${nationalIdFound ? nationalId : ''}
                    already exists!
                    `.replace(/\n/g, '').replace(/\s+/g, ' ').trim(),
            });
        }

        const newEquipmentRecordColumns = [
            'firstName',
            'lastName',
            'email',
            'telephone',
            'nationalId',
            'position',
            'department',
            'model',
            'laptopManufacturer',
            'serialNumber'
        ];

        const newEquipValues = newEquipmentRecordColumns.map((col, i) => req.body[col]);

        const insertQuery = `
            INSERT INTO equipments (${newEquipmentRecordColumns.join(', ')}) 
            VALUES (${newEquipValues.map((_, i) => `$${i + 1}`).join(', ')})
            RETURNING *
        `;

        const insertedRecord = await pool.query(insertQuery, newEquipValues);
        const newEquip = insertedRecord.rows[0];
    
        res.status(201).send({
            success: true,
            status: 201,
            message: 'Record created successfully.',
            data: newEquip,
        });
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            status: 400,
            message: organiseStrings(error.message),
        });
    }
}

const fetchEmployeeRecords = async (req, res) => {
    try {
        let { size: limit, start: page } = req.query;
    
        if (!page || page < 0) page = 1;
        if (!limit || limit < 0) limit = 6;
    
        const offset = 3;
        // NOTE: incomplete (the pagination is not complete the below query should change and offset value should be dynamic)
    
        const query = `
            SELECT
                firstName,
                lastName,
                email,
                position,
                department,
                telephone,
                nationalId,
                laptopManufacturer,
                model,
                serialNumber,
                id
            FROM equipments
        `;
    
        const result = await pool.query(query);
        const equipments = result.rows;
    
        res.status(200).send({
            success: true,
            status: 200,
            message: 'Equipments registered',
            data: equipments,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            status: 400,
            message: organiseStrings(error.message),
        });
    }
}

export {
    createEmployeeRecord,
    fetchEmployeeRecords,
}