import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar({ authBtn }) {
    const navigate = useNavigate()

    const authAction = () => {
        navigate(`${authBtn.path}`)
    }
    const backToHome= () => {
        navigate('/')
    }
    return (
        <Fragment>
            <div className="w-full h-[10vh] bg-abi-seth-ne-gray/[.24]">
                <div className="flex items-center justify-between w-10/12 h-full px-6 m-auto">
                    <div className="flex h-full">
                        <img
                            className='cursor-pointer'
                            onClick={() => backToHome()}
                            src="icons/logo.svg"
                            alt="logo-icon"
                            width={100}
                            height={36}
                        />
                    </div>
                    <div className="flex text-xs font-semibold font-sikora-poppins">
                        <button onClick={() => authAction()} className="w-auto px-5 py-3 text-white rounded-lg cursor-pointer bg-abi-seth-ne-blue">
                            {authBtn.label}
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}