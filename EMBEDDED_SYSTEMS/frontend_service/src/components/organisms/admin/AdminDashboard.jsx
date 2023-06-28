import { useEffect, useState } from 'react'
import WeatherTable from '../../molecules/tables/WeatherTable'
import WeatherGraph from '../../molecules/charts/WeatherGraph'
import { fetchStorage } from '../../../utils/localStorage'
import toast from 'react-hot-toast'
import Loader from '../../atoms/loaders/Loader'

const AdminDashboard = () => {
    const [temperatureData, setTemperatureData] = useState([])
    const [humidityData, setHumidityData] = useState([])
    const [inProgress, setInProgress] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = new URL('/v1/api/weather', 'http://localhost:5000')
                const jwtToken = fetchStorage('auth_token')
        
                const response = await fetch(url.href, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                        'x-application-host': url.href,
                        'Content-Type': 'application/json',
                    },
                })
        
                const { data } = await response.json()
                setTemperatureData(data.docs)
                setHumidityData(data.docs)
                toast.success('Successfully fetched stats', { duration: 3000 })
                setInProgress(false)
            } catch (error) {
                setInProgress(false)
                toast.error('Failed to fetch stats', { duration: 3000 })
            }
        }
    
        fetchData()
    }, [])

    return (
        <div className="w-full h-auto mb-10">
            <p className="font-abi-seth-ne-poppins mb-4">Dashboard Stats</p>
            <div className="w-full h-auto flex items-center justify-center">
                {inProgress ? (
                    <div className="p-6">
                        <Loader message="Fetching graph stats . . ." />
                    </div>
                ) :
                    (<WeatherGraph
                        temperatureData={temperatureData}
                        humidityData={humidityData}
                    />
                )}
            </div>
            <div className="mt-[2em] mb-[40em]">
                <WeatherTable />
            </div>
        </div>
    )
}

export default AdminDashboard