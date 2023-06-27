import { Fragment, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'; 
import ButtonText from '../../atoms/buttons/ButtonText'
import InputText from '../../atoms/inputs/InputText'
import { setStorage } from '../../../utils/localStorage'
import useApi from '../../../hooks/useApi'
import { AccountContext } from '../../../context/Account'

const LoginForm = () => {
    const navigate = useNavigate()
    const [names, setNames] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [inProgress, setInProgress] = useState(false)
    const { refreshSession } = useContext(AccountContext)
    
    const [account, setAccount] = useState(null)
    const { data, error, loading, request: registerRequest } = useApi(`user/register`, 'POST', account)

    const signup = () => {
        setInProgress(true)
        if (email === '' || password === '' || names === '' || phone === '') {
            toast.error('Names, Phone, Email and Password should be provided!', { duration: 4000 })
            setInProgress(false)
            return  
        }
        setAccount({
            fullNames: names,
            phone,
            email,
            password
        })
    }

    useEffect(() => {
        if (account) registerRequest()
    }, [account])

    useEffect(() => {
        if (!loading && account && data) {
            if (data.success && data.data) {
                setStorage('auth_token', data.data.token)
                refreshSession()
                toast.success('Registration successful!', { duration: 3000 })
                navigate('/login')
            } else {
                toast.error(error || data.message || 'Something went wrong!', { duration: 3000 })
            }
            setInProgress(false)
        }
    }, [data])

    return (
        <Fragment>
            <div className="flex flex-col w-full">
                <InputText
                    label="Full names"
                    type="text"
                    value={names}
                    onChange={value => setNames(value)}
                    required={true}
                />
                <InputText
                    label="Email address"
                    type="text"
                    value={email}
                    onChange={value => setEmail(value)}
                    required={true}
                />
                <InputText
                    label="Phone Number"
                    type="text"
                    value={phone}
                    onChange={value => setPhone(value)}
                    required={true}
                />
                <InputText
                    label="Password"
                    value={password}
                    type='password'
                    onChange={value => setPassword(value)}
                    required={true}
                />
                <div className="relative flex items-center justify-between mb-5">
                    <div className="flex items-center" onClick={() => setRememberMe(!rememberMe)}>
                        <span
                            className={`
                                ${rememberMe ? 'border-abi-seth-ne-blue border-[1.5px]' : 'border-abi-seth-ne-gray-1 border-[1.2px]'}
                                flex items-center justify-center w-[1.5em] h-[1.5em] rounded-md outline-none hover:border-abi-seth-ne-blue-1 hover:border-[1.5px] cursor-pointer
                            `}
                        >
                            {rememberMe && (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path d="M10.0007 15.1709L19.1931 5.97852L20.6073 7.39273L10.0007 17.9993L3.63672 11.6354L5.05093 10.2212L10.0007 15.1709Z" fill="rgba(99,102,241,1)"></path>
                            </svg>)}
                        </span>
                        <p className="text-xs font-abi-seth-ne-poppins text-abi-seth-ne-black-1/[.6] ml-3">Agree to Terms</p>
                    </div>
                </div>
                <ButtonText label="Create Account" onClick={() => signup()} inProgress={inProgress} />
                <div className="my-2">
                    <p className="flex">
                        <span className="text-xs font-abi-seth-ne-poppins text-abi-seth-ne-black-1/[.6] mr-2">Already have a Registered Account?</span>
                        <span className="text-xs underline cursor-pointer font-abi-seth-ne-poppins text-abi-seth-ne-black underline-offset-2">
                            <span onClick={() => navigate('/login')}>Login Account</span>
                        </span>
                    </p>
                </div>
            </div>
        </Fragment>
    )
}

export default LoginForm
