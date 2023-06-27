import UserTable from '../../molecules/tables/UserTable'

const AdminDashboard = () => {
    return (
        <div className="w-full h-auto">
            <p className="font-abi-seth-ne-poppins mb-4">Dashboard Stats</p>
            <UserTable />
        </div>
    )
}

export default AdminDashboard