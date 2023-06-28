import { Outlet } from 'react-router-dom'
import Navbar from '../components/molecules/navbars/Navbar'

const Main = () => {
    return (
        <div className='w-full h-screen'>
            <div className='fixed top-0 w-full border-[1.2px] border-abi-seth-ne-black-1/20'>
                <Navbar />
            </div>
            <div className='flex'>
                <div
                    className='fixed top-[10vh] max-[640px]:left-0 w-full max-[640px]:w-full h-[120vh] px-5 max-[640px]:px-3 py-4 overflow-auto bg-abi-seth-ne-gray-1/10'
                >
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Main