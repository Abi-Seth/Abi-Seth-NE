import { createContext, useMemo } from 'react'
import { fetchStorage } from '../utils/localStorage'

const SessionContext = createContext()

function Session({ session, logoutSession, children }) {
    const sessionValues = useMemo(() => {
        const result = {
            session: {
                ...session,
                accessToken: {
                    jwtToken: fetchStorage('auth_token')
                }
            },
            logoutSession,
        }
        return result
    }, [session, logoutSession])

    return (
        <SessionContext.Provider value={sessionValues}>
            {children}
        </SessionContext.Provider>
    )
}

export { Session, SessionContext }
