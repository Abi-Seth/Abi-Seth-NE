import EmployeeTable from '../../molecules/tables/EmployeeTable'

const AdminDashboard = () => {
    return (
        <div className="w-full h-auto">
            <p className="font-abi-seth-ne-poppins mb-4">Dashboard Stats</p>
            <EmployeeTable />
        </div>
    )
}

export default AdminDashboard