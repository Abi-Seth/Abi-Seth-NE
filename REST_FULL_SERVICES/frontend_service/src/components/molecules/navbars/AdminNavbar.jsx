import { useContext } from 'react'
import { UserDetailsContext } from '../../../context/UserDetails'

const AdminNavbar = ({ openMenu }) => {
    const { currentUserInfo } = useContext(UserDetailsContext)

    return (
        <div
            className='flex items-center justify-between w-full h-[12vh] px-6 max-[640px]:px-4 bg-white'
        >
            <h1 className='inline-block text-2xl font-extrabold'>
                NE-ABI |
                <span className='text-xs font-bold font-abi-seth-ne-poppins ml-2'>Administration</span>
            </h1>
            <div className="flex items-center">
                <p className='mr-3 font-abi-seth-ne-poppins min-[640px]:hidden' onClick={openMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path></svg>
                </p>
                <p className='mr-3 font-abi-seth-ne-poppins text-sm max-[640px]:hidden'>
                    {currentUserInfo?.email}
                </p>
                <span className='w-[2.8em] h-[2.8em] rounded-full bg-abi-seth-ne-blue-1/70 flex items-center justify-center'>
                    <span className="w-[1.9em] h-[1.9em] rounded-full bg-abi-seth-ne-blue flex items-center justify-center text-white">
                        {currentUserInfo?.email[0].toUpperCase()}
                    </span>
                </span>
            </div>
        </div>
    )
}

export default AdminNavbar