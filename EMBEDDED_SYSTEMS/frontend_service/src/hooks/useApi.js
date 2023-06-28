import { useCallback, useState } from 'react'
import { fetchStorage } from '../utils/localStorage'

const BASE_URL = 'http://localhost:5000/v1/api'

export default (url, method, body) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const host = window?.location?.host

    const request = useCallback(async () => {
        setLoading(true)
        try {
            fetch(`${BASE_URL}/${url}`, {
                method,
                headers: {
                    Authorization: `Bearer ${fetchStorage('auth_token')}`,
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
    }, [url, method, host, body])

    return {
        data,
        error,
        loading,
        request,
    }
}
