import { create } from 'apisauce'
import { API_URL } from '../config/api-url'

export const apiRequest = create({
    baseURL: API_URL,
    timeout: 1000000
})