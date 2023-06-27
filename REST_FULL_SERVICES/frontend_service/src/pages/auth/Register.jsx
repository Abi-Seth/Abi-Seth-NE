import { useNavigate } from 'react-router'
import AuthenticationLayout from '../../layouts/Auth'
import ButtonText from '../../components/atoms/buttons/ButtonText'

const Register = () => {
    const navigate = useNavigate()
    return (
        <AuthenticationLayout>
            <div className='w-full h-[85vh] flex items-center justify-center flex-col'>
                <p className='font-abi-seth-ne-poppins text-abi-seth-ne-black-1 mb-4'>
                    Registration for Administrators done in Postman | Swagger
                </p>
                <ButtonText label='Back to Login' inProgress={false} onClick={() => navigate('/login')} />
            </div>
        </AuthenticationLayout>
    )
}

export default Register