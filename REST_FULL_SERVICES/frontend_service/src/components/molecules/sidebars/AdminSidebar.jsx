import { useContext } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import { AccountContext } from '../../../context/Account'

const AdminSidebar = ({ links }) => {
    const { logoutSession } = useContext(AccountContext)
    const location = useLocation()
    const path = location.pathname
    return (
        <div className="w-full flex flex-col items-center relative h-full">
            <span className='mt-4'>
                {links.map(link => (
                    <NavLink
                        key={link.name}
                        to={link.href}
                        className={`${path === link.href ? 'text-white bg-abi-seth-ne-blue' : 'text-abi-seth-ne-black'} flex items-center mb-3 px-8 py-3 rounded-md gap-3 text-sm font-abi-seth-ne-poppins`}
                    >
                        <link.icon
                            className={`${path === link.href ? 'text-white' : 'text-abi-seth-ne-black'} h-5 w-5 flex-shrink-0`}
                            aria-hidden="true"
                        />
                        {link.name}
                    </NavLink>
                ))}
            </span>
            <button
                onClick={() => logoutSession()}
                className="hover-fill absolute top-[70%] hover:bg-abi-seth-ne-blue hover:text-white flex items-center justify-between px-7 py-3 text-sm rounded-md font-abi-seth-ne-poppins border-[1.5px] border-abi-seth-ne-blue text-abi-seth-ne-blue mt-4 gap-4"
            >
                Logout Now
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                >
                    <path
                        d="M10.0859 12.0001L5.29297 16.793L6.70718 18.2072L12.9143 12.0001L6.70718 5.79297L5.29297 7.20718L10.0859 12.0001ZM17.0001 6.00008L17.0001 18.0001H15.0001L15.0001 6.00008L17.0001 6.00008Z"
                    ></path>
                </svg>
            </button>
        </div>
    )
}

export default AdminSidebar