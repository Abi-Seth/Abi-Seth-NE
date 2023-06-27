// import AdminDashboard from '../../components/organisms/admin/AdminDashboard'

import ProductsList from "../../components/organisms/clients/ProductsList"
import ShoppingCart from "../../components/organisms/clients/ShoppingCart"

const Dashboard = () => {
    return (
        <div className="w-full h-auto mb-[15em] py-2 flex">
            {/* <AdminDashboard /> */}
            <div className="w-[70%]">
                <ProductsList />
            </div>
            <div className="w-[30%]">
                <ShoppingCart />
            </div>
        </div>
    )
}

export default Dashboard