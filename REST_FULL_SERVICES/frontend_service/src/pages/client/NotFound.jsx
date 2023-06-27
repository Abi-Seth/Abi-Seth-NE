import React from 'react'
import { useNavigate } from 'react-router'
import ButtonText from '../../components/atoms/buttons/ButtonText'

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <React.Fragment>
            <div className='w-full h-screen flex flex-col items-center justify-center'>
                <h1 className='text-abi-seth-ne-black font-extrabold text-[2.9em]'>
                    404
                </h1>
                <h2 className='text-abi-seth-ne-black-1 text-sm opacity-60 font-abi-seth-ne-poppins my-3'>
                    You Are Lost! The Page You are looking for does not exit
                </h2>
                <ButtonText label='Back to Home' inProgress={false} onClick={() => navigate('/')} />
            </div>
        </React.Fragment>
    )
}

export default NotFound