import { HomeIcon, QueueListIcon } from '@heroicons/react/24/outline'
import { Outlet } from 'react-router-dom'
import { Session } from '../context/Session'
import { UserDetailsContextProvider } from '../context/UserDetails'
import AdminNavbar from '../components/molecules/navbars/AdminNavbar'
import Sidebar from '../components/molecules/sidebars/AdminSidebar'
import { useState } from 'react'

const Main = ({ session, logoutSession }) => {
    const navigationLinks = [
        { name: 'Dashboard', href: '/admin', icon: HomeIcon },
        { name: '+ Equipment', href: '/admin/add', icon: QueueListIcon },
    ]
    const [openMenu, setOpenMenu] = useState(false)

    return (
        <Session session={session} logoutSession={logoutSession}>
            <UserDetailsContextProvider>
            <div className='w-full h-screen'>
                <div className='fixed top-0 w-full border-[1.2px] border-abi-seth-ne-black-1/20'>
                    <AdminNavbar openMenu={() => setOpenMenu(!openMenu)} />
                </div>
                <div className='flex'>
                    <div
                        className={`
                            ${openMenu ? 'w-full z-50 bg-white' : 'max-[640px]:hidden'}
                            fixed top-[12vh] w-[18%] h-full border-r-[1.2px] border-abi-seth-ne-black-1/20 px-4`
                        }
                    >
                        <Sidebar links={navigationLinks} />
                    </div>
                    <div
                        className='fixed top-[12vh] left-[18%] max-[640px]:left-0 w-[82%] max-[640px]:w-full h-[120vh] px-5 max-[640px]:px-3 py-4 overflow-auto bg-abi-seth-ne-gray-1/10'
                    >
                        <Outlet />
                    </div>
                </div>
            </div>
            </UserDetailsContextProvider>
        </Session>
    )
}

export default Main