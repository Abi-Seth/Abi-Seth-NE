/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AccountContext } from './Account'
import Loader from '../components/atoms/loaders/Loader'
import Main from '../layouts/Main'

const Authentication = () => {
    const [session, setSession] = useState(null)
    const [sessionChecked, setSessionChecked] = useState(false)
    const [sessionStatus, setSessionStatus] = useState(false)

    const {
        getSession: session_data,
        loading,
        checkDone,
        logoutSession
    } = useContext(AccountContext)
    const location = useLocation()

    const checkSession = () => {
        if (session_data) {
            setSession(session_data)
            setSessionStatus(true)
            setSessionChecked(true)
        } else {
            if (checkDone) {
                setSessionStatus(false)
                setSessionChecked(true)
            }
        }
    }
    useEffect(() => {
        if (!loading) checkSession()
    }, [session_data, logoutSession])

    return (
        <React.Fragment>
            {sessionChecked ? (
                sessionStatus && session ? (
                    <Main session={session} logoutSession={logoutSession} />
                ) : (
                    <Navigate to="/login" replace state={{ path: location.pathname }} />
                )
            ) : (
                <Loader message="Retrieving session . . ." />
            )}
        </React.Fragment>
    )
}

export default Authentication