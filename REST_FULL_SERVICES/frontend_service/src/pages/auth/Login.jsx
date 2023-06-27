import AuthenticationLayout from '../../layouts/Auth'
import LoginForm from '../../components/molecules/forms/LoginForm'

const Login = () => {
    return (
        <AuthenticationLayout login={true}>
            <div className="flex flex-col items-center justify-center pt-10 h-auto min-h-[90vh]">
                <h1 className="mb-5 text-xl font-extrabold font-abi-seth-ne-poppins">
                    Login Your Account
                </h1>
                <p className="text-xs leading-6 text-center text-abi-seth-ne-black/[.4] font-abi-seth-ne-poppins font-medium">
                    Use your account details to Login to you account. If you don&apos;t <br /> remember contact us to help you out.
                </p>
                <div className="w-[30%] max-[640px]:w-[90%] my-10">
                    <LoginForm />
                </div>
            </div>
        </AuthenticationLayout>
    )
}

export default Login