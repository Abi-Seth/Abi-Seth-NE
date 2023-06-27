import React, { useContext, useEffect, useMemo, useState } from 'react'
import useApi from '../hooks/useApi'

const UserDetailsContext = React.createContext()

export function UserDetailsContextProvider({ children }) {
    const [currentUserId, setCurrentUserId] = useState(null)
    const { data: currentUserInfo, request: userRequest } = useApi(`user/current`, 'GET')

    useEffect(() => {
        userRequest()
    }, [])

    useEffect(() => {
        if (currentUserInfo) {
            setCurrentUserId(currentUserInfo?.data?._id)
        }
    }, [currentUserInfo])

    const refreshUserInfo = () => userRequest()

    return (
        <UserDetailsContext.Provider
            value={useMemo(
                () => ({
                    currentUserId,
                    currentUserInfo: currentUserInfo?.data,
                    refreshUserInfo,
                }),
                [currentUserInfo, currentUserId]
            )}
        >
            {children}
        </UserDetailsContext.Provider>
    )
}

export const UserDetailsConsumer = UserDetailsContext.Consumer
export { UserDetailsContext }
export default () => {
    const context = useContext(UserDetailsContext)
    return context
}
