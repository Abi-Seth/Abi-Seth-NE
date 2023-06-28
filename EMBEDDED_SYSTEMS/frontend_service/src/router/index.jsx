import {
    BrowserRouter,
    Route,
    Routes,
    Navigate
} from 'react-router-dom'
import Main from '../layouts/Main'
import Dashboard from '../pages/admin/Dashboard'
import NotFound from '../pages/client/NotFound'

const ApplicationRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to='/records' />} />
                <Route path='/records' element={<Main />}>
                    <Route index element={<Dashboard />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default ApplicationRouter