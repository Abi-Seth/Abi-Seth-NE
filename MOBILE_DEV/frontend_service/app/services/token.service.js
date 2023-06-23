import { apiRequest } from '../hooks/apiRequest'

const buyToken = billDetails => apiRequest.post('token', billDetails)
const checkTokens = meter_number => apiRequest.get(`token/check-tokens/${meter_number}`)
const validateToken = token_id => apiRequest.get(`token/validate-token/${token_id}`)

export { buyToken, checkTokens, validateToken }