import { createContext, useEffect, useState } from 'react'
import { removeStorage } from '../utils/localStorage'
import { useDispatch } from 'react-redux'
import { loginUser, logoutUser } from '../store/modules/userSlice'
import useApi from '../hooks/useApi'

const AccountContext = createContext()

const Account = ({ children }) => {
    const dispatch = useDispatch()
    const { data: currentUserInfo, loading, request: userRequest } = useApi(`user/current`, 'GET')
    const [getSession, setGetSession] = useState(null);
    const [checkDone, setSessionChecked] = useState(false);

    useEffect(() => {
        if (!loading && currentUserInfo) {
            if (!currentUserInfo.success) setGetSession(null)
            dispatch(loginUser(currentUserInfo.data))
            setGetSession(currentUserInfo.data)
            setSessionChecked(true)
        }
    }, [loading, currentUserInfo])

    useEffect(() => {
        if (!getSession && !loading)
            userRequest()
    }, [])

    const refreshSession = () => userRequest()
    const logoutSession = () => {
        removeStorage('auth_token')
        dispatch(logoutUser({}))
        setGetSession(null)
        setSessionChecked(true)
    }

    return (
        <AccountContext.Provider
            value={
                {
                    loading,
                    getSession,
                    checkDone,
                    refreshSession,
                    logoutSession,
                }
            }
        >
            {children}
        </AccountContext.Provider>
    )
}

export { Account, AccountContext }