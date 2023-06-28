import { useMemo, useState, useEffect } from 'react'
import { MaterialReactTable } from 'material-react-table'
import { fetchStorage } from '../../../utils/localStorage'
import toast from 'react-hot-toast'

const WeatherTable = () => {
    const handleRowIconClick = (cellData, rowData) => {
        console.log(rowData);
    };
    const columns = useMemo(
        () => [
            {
                accessorKey: 'device',
                header: 'Device Name',
                size: 150,
            },
            {
                accessorKey: 'temperature',
                header: 'Temperature',
                size: 150,
            },
            {
                accessorKey: 'humidity',
                header: 'Humidity',
                size: 150,
            },
            {
                accessorKey: 'createdAt',
                header: 'Created On',
                size: 150,
            },
            {
                accessorKey: 'updatedAt',
                header: 'Updated On',
                size: 150,
            },
            {
                accessorKey: 'actions',
                header: 'Actions',
                size: 100,
                Cell: ({ cell, row }) => (
                    <span
                        className='flex items-center justify-center cursor-pointer'
                        onClick={() => handleRowIconClick(cell, row)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM13.4142 13.9997L15.182 15.7675L13.7678 17.1817L12 15.4139L10.2322 17.1817L8.81802 15.7675L10.5858 13.9997L8.81802 12.232L10.2322 10.8178L12 12.5855L13.7678 10.8178L15.182 12.232L13.4142 13.9997ZM9 4V6H15V4H9Z" fill="rgba(216,55,0,1)"></path>
                        </svg>
                    </span>
                ),
            },
        ],
        [],
    )

    const [data, setData] = useState([])
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isRefetching, setIsRefetching] = useState(false)
    const [rowCount, setRowCount] = useState(0)

    const [columnFilters, setColumnFilters] = useState([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [sorting, setSorting] = useState([])
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    })

    useEffect(() => {
        const fetchData = async () => {
            if (!data.length) {
                setIsLoading(true)
            } else {
                setIsRefetching(true)
            }
        
            const url = new URL('/v1/api/weather', 'http://localhost:5000')
            url.searchParams.set(
                'start',
                `${pagination.pageIndex * pagination.pageSize}`,
            )
            url.searchParams.set('size', `${pagination.pageSize}`)
            url.searchParams.set('filters', JSON.stringify(columnFilters ?? []))
            url.searchParams.set('globalFilter', globalFilter ?? '')
            url.searchParams.set('sorting', JSON.stringify(sorting ?? []))

            const jwtToken = fetchStorage('auth_token')
            try {
                const response = await fetch(url.href, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                        'x-application-host': url.href,
                        'Content-Type': 'application/json',
                    }
                })
                const json = await response.json()
                const res = json.data
                toast.success('Successfully fetched records', { duration: 3000 })
                setData(res.docs.map(doc => ({
                    ...doc,
                    temperature: `${doc.temperature} °C`,
                    humidity: `${doc.humidity} g.m-3`,
                    createdAt: new Date(doc.createdAt).toDateString(),
                    updatedAt: new Date(doc.updatedAt).toDateString()
                })))
                setRowCount(res.totalPages)
            } catch (error) {
                toast.error('Failed to fetch records', { duration: 3000 })
                setIsError(true)
                return
            }
            setIsError(false)
            setIsLoading(false)
            setIsRefetching(false)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        pagination.pageIndex,
        pagination.pageSize
    ])

    return (
        <MaterialReactTable
            columns={columns}
            data={data}
            enableRowSelection
            getRowId={(row) => row.nationalId}
            initialState={{ showColumnFilters: false }}
            manualPagination
            muiToolbarAlertBannerProps={
                isError
                ? {
                    color: 'error',
                    children: 'Error loading weather data',
                }
                : undefined
            }
            onColumnFiltersChange={setColumnFilters}
            onGlobalFilterChange={setGlobalFilter}
            onPaginationChange={setPagination}
            onSortingChange={setSorting}
            rowCount={rowCount}
            state={{
                columnFilters,
                globalFilter,
                isLoading,
                pagination,
                showAlertBanner: isError,
                showProgressBars: isRefetching,
                sorting,
            }}
        />
    )
}

export default WeatherTable