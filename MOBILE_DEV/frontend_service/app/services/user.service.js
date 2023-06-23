import { apiRequest } from '../hooks/apiRequest'
import { getToken } from '../common/storage'

const getCurrentUser = async () => apiRequest.get('user', {
    headers: {
        'Authorization': `Bearer ${await getToken()}`
    }
})

const login = async account => apiRequest.post('user/login', account)

export { getCurrentUser, login }