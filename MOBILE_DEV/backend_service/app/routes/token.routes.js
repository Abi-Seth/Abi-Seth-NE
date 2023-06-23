import { Router } from 'express'
import { buyToken, validateTokenExpiry, checkTokens } from '../controllers'

const _token_router = Router()

_token_router.route('/')
    .post(buyToken)

_token_router.route('/check-tokens/:meter_number')
    .get(checkTokens)

_token_router.route('/validate-token/:token_id')
    .get(validateTokenExpiry)

export default _token_router