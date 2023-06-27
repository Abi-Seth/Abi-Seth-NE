import AuthenticationLayout from '../../layouts/Auth'
import RegisterForm from '../../components/molecules/forms/SignupForm'

const Login = () => {
    return (
        <AuthenticationLayout login={false}>
            <div className="flex flex-col items-center justify-center pt-10 h-auto min-h-[90vh]">
                <h1 className="mb-5 text-xl font-extrabold font-abi-seth-ne-poppins">
                    Create Your Account
                </h1>
                <p className="text-xs leading-6 text-center text-abi-seth-ne-black/[.4] font-abi-seth-ne-poppins font-medium">
                    Register your account today and use our smart shopping
                </p>
                <div className="w-[30%] max-[640px]:w-[90%] my-10">
                    <RegisterForm />
                </div>
            </div>
        </AuthenticationLayout>
    )
}

export default Login