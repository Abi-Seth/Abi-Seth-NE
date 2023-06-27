/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AccountContext } from '../context/Account'
import Loader from '../components/atoms/loaders/Loader'
import Navbar from '../components/molecules/navbars/Navbar'

const AuthenticationLayout = ({ children, login }) => {
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
                    <Navigate to="/admin" replace state={{ path: location.pathname }} />
                ) : (
                    <React.Fragment>
                        <div className="w-full">
                            <Navbar authBtn={{
                                label: login ? 'Get Started' : 'Login Now',
                                path: login ? '/signup' : '/login'
                            }} />
                        </div>
                        <div className="w-full">
                            {children}
                        </div>
                    </React.Fragment>
                )
            ) : (
                <Loader message="Retrieving session . . ." />
            )}
        </React.Fragment>
    )
}

export default AuthenticationLayout