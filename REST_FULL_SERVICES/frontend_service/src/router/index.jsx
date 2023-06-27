import {
    BrowserRouter,
    Route,
    Routes,
    Navigate
} from 'react-router-dom'
import Authentication from '../context/Authentication'
import { Account } from '../context/Account'
import { Session } from '../context/Session'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Dashboard from '../pages/admin/Dashboard'
import EquipmentRecord from '../pages/admin/EquipmentRecord'
import NotFound from '../pages/client/NotFound'

const ApplicationRouter = () => {
    return (
        <Session>
            <Account>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Navigate to='/admin' />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<Register />} />
                        <Route path='/admin' element={<Authentication />}>
                            <Route index element={<Dashboard />} />
                            <Route path="stats" element={<Dashboard />} />
                            <Route path="add" element={<EquipmentRecord />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </Account>
        </Session>
    )
}

export default ApplicationRouter