import { Fragment } from "react"

export default function InputText({ label, value, type, placeholder, required, onChange }) {
    return (
        <Fragment>
            <div className="flex flex-col w-full">
                <label
                    htmlFor={label}
                    className="mb-2 text-xs font-abi-seth-ne-poppins text-abi-seth-ne-black-1/[.8]"
                >
                    {label}
                </label>
                <input
                    className="px-3 py-2 border-[1.2px] border-abi-seth-ne-gray-1 outline-none focus:border-abi-seth-ne-blue focus:border-[1.5px] rounded-md mb-5"
                    type={type}
                    name={label}
                    value={value}
                    required={required}
                    placeholder={placeholder}
                    onChange={event => onChange(event.target.value)}
                />
            </div>
        </Fragment>
    )
}