import { useCallback, useContext, useState } from 'react'
import { SessionContext } from '../context/Session'
import { fetchStorage } from '../utils/localStorage'

const BASE_URL = 'http://localhost:5000/v1/api'

export default (url, method, body) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const useSession = () => useContext(SessionContext)
    const {
        session: {
            accessToken: { jwtToken },
        },
    } = useSession()
    const host = window?.location?.host

    const request = useCallback(async () => {
        setLoading(true)
        try {
            fetch(`${BASE_URL}/${url}`, {
                method,
                headers: {
                    Authorization: `Bearer ${jwtToken || fetchStorage('auth_token')}`,
                    'x-application-host': host,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
                .then(response => response.json())
                .then(data => setData(data))
                .then(() => setLoading(false))
        } catch (err) {
            setError(err.message)
        }
    }, [url, method, host, jwtToken, body])

    return {
        data,
        error,
        loading,
        request,
    }
}
