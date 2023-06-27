import { useMemo, useState, useEffect } from 'react'
import { MaterialReactTable } from 'material-react-table'
import { fetchStorage } from '../../../utils/localStorage'

const EmployeeTable = () => {
    const columns = useMemo(
        () => [
            {
                accessorKey: 'firstname',
                header: 'First Name',
                size: 150,
            },
            {
                accessorKey: 'lastname',
                header: 'Last Name',
                size: 150,
            },
            {
                accessorKey: 'nationalid',
                header: 'National ID',
                size: 200,
            },
            {
                accessorKey: 'telephone',
                header: 'Phone Number',
                size: 150,
            },
            {
                accessorKey: 'email',
                header: 'Email Address',
                size: 150,
            },
            {
                accessorKey: 'department',
                header: 'Department',
                size: 100,
            },
            {
                accessorKey: 'position',
                header: 'Position',
                size: 100,
            },
            {
                accessorKey: 'laptopmanufacturer',
                header: 'Manufacturer',
                size: 100,
            },
            {
                accessorKey: 'model',
                header: 'Model',
                size: 100,
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
        pageIndex: 1,
        pageSize: 5,
    })

    useEffect(() => {
        const fetchData = async () => {
            if (!data.length) {
                setIsLoading(true)
            } else {
                setIsRefetching(true)
            }
        
            const url = new URL('/v1/api/equipment', 'http://localhost:5000')
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
                setData(res)
                setRowCount(res.length)
            } catch (error) {
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
            initialState={{ showColumnFilters: true }}
            manualPagination
            muiToolbarAlertBannerProps={
                isError
                ? {
                    color: 'error',
                    children: 'Error loading data',
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

export default EmployeeTable