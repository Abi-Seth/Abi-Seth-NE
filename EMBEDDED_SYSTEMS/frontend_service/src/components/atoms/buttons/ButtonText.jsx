import { Fragment } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

export default function ButtonText({ label, inProgress, onClick }) {
    return (
        <Fragment>
            <button
                onClick={onClick}
                disabled={inProgress}
                className={
                    `${inProgress && 'cursor-not-allowed'} relative px-3 py-3.5 border-[1.2px] bg-abi-seth-ne-black/[.95] border-abi-seth-ne-black outline-none rounded-md mb-5 flex justify-center items-center
                `}
            >
                <span className={`${inProgress ? 'text-white/[.2]' : 'text-white'} text-xs font-abi-seth-ne-poppins font-medium`}>
                    {label}
                </span>
                {inProgress && 
                    <AiOutlineLoading3Quarters className="absolute text-lg text-white animate-spin" />
                }
            </button>
        </Fragment>
    )
}