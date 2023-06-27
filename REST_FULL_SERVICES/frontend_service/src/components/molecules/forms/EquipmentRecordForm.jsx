import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'; 
import ButtonText from '../../atoms/buttons/ButtonText'
import InputText from '../../atoms/inputs/InputText'
import useApi from '../../../hooks/useApi'

const EquipmentRecordForm = () => {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [telephone, setTelephone] = useState('')
    const [serialNumber, setSerialNumber] = useState('')
    const [nationalId, setNationalId] = useState('')
    const [position, setPosition] = useState('')
    const [department, setDepartment] = useState('')
    const [model, setModel] = useState('')
    const [laptopManufacturer, setLaptopManufacturer] = useState('')
    const [inProgress, setInProgress] = useState(false)
    
    const [record, setRecord] = useState(null)
    const { data, error, loading, request: equipRequest } = useApi(`equipment`, 'POST', record)

    const syncRecord = () => {
        setInProgress(true)
        setRecord({
            email,
            firstName,
            lastName,
            telephone,
            nationalId,
            position,
            department,
            model,
            laptopManufacturer,
            serialNumber,
        })
    }

    useEffect(() => {
        if (record) equipRequest()
    }, [record])

    useEffect(() => {
        if (!loading && record && data) {
            if (data.success && data.data) {
                toast.success('Equipment added successfully!', { duration: 3000 })
                navigate('/')
            } else {
                toast.error(error || data.message || 'Something went wrong!', { duration: 3000 })
            }
            setInProgress(false)
        }
    }, [data])

    return (
        <Fragment>
            <div className="flex flex-col w-full bg-white rounded-md p-2">
                <div className="flex gap-3">
                    <InputText
                        label="First Name"
                        type="text"
                        value={firstName}
                        onChange={value => setFirstName(value)}
                        required={true}
                    />
                    <InputText
                        label="Last Name"
                        type="text"
                        value={lastName}
                        onChange={value => setLastName(value)}
                        required={true}
                    />
                </div>
                <div className="flex gap-3">
                    <InputText
                        label="National ID"
                        type="text"
                        value={nationalId}
                        onChange={value => setNationalId(value)}
                        required={true}
                    />
                    <InputText
                        label="Telephone"
                        type="text"
                        value={telephone}
                        onChange={value => setTelephone(value)}
                        required={true}
                    />
                </div>
                <div className="flex gap-3">
                    <InputText
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={value => setEmail(value)}
                        required={true}
                    />
                    <InputText
                        label="Department"
                        type="text"
                        value={department}
                        onChange={value => setDepartment(value)}
                        required={true}
                    />
                </div>
                <div className="flex gap-3">
                    <InputText
                        label="Position"
                        type="text"
                        value={position}
                        onChange={value => setPosition(value)}
                        required={true}
                    />
                    <InputText
                        label="Laptop Manufacturer"
                        type="text"
                        value={laptopManufacturer}
                        onChange={value => setLaptopManufacturer(value)}
                        required={true}
                    />
                </div>
                <div className="flex gap-3">
                    <InputText
                        label="Model"
                        type="text"
                        value={model}
                        onChange={value => setModel(value)}
                        required={true}
                    />
                    <InputText
                        label="Serial Number"
                        type="text"
                        value={serialNumber}
                        onChange={value => setSerialNumber(value)}
                        required={true}
                    />
                </div>
                <div className="w-[30%]">
                    <ButtonText label="Register Equipment" onClick={() => syncRecord()} inProgress={inProgress} />
                </div>
            </div>
        </Fragment>
    )
}

export default EquipmentRecordForm
