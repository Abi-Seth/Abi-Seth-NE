import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate()

    const backToHome= () => {
        navigate('/')
    }
    return (
        <Fragment>
            <div className="w-full h-[10vh] bg-abi-seth-ne-gray/[.24]">
                <div className="flex items-center justify-between w-12/12 h-full px-6 m-auto">
                    <div className="flex h-full">
                        <img
                            className='cursor-pointer'
                            onClick={() => backToHome()}
                            src="icons/logo.svg"
                            alt="logo-icon"
                            width={190}
                            height={20}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}