import React, { useEffect, useRef, useState } from 'react'

export default function Toast() {


    const [toastlist, setToastList] = useState([]);
    const timerRef = useRef({})

    const handleToastToggle = (message, type) => {
        const id = new Date().getTime()
        const newToasts = [...toastlist, { id, message, type }];
        setToastList(newToasts)
        // autoclose logic
        timerRef.current[id] = setTimeout(() => handleClose(id), 5000);
    }

    const handleClose = (id) => {
        // Remove Exisiting timeout
        clearTimeout(timerRef.current[id]);
        delete timerRef.current[id];
        setToastList((prev) => {
            const filteredArr = prev.filter((item) => {
                return item.id !== id;
            })
            return filteredArr;
        })

    }

    return (
        <>

            <div className="toast-container">

                {toastlist?.map((item) => {
                    const color = {
                        success: "bg-green-400",
                        warning: "bg-yellow-400",
                        info: "bg-blue-400",
                        error: "bg-red-400"
                    }
                    return (
                        <React.Fragment key={toastlist?.id}>
                            <div className={`toast ${color[item.type]} px-4 w-32  text-white rounded-md `}>
                                {item?.message}
                                <span onClick={() => handleClose(item.id)}>x</span>

                            </div>
                        </React.Fragment>
                    )
                })}
            </div>
            <div className="flex justify-center items-center space-x-4 h-screen">
                <button type='button' onClick={() => handleToastToggle("Success", "success")} className='bg-black text-white rounded-md px-4 py-2 cursor-pointer'>
                    Success
                </button>
                <button type='button' onClick={() => handleToastToggle("Warning", "warning")} className='bg-black text-white rounded-md px-4 py-2 cursor-pointer'>
                    Warning
                </button>
                <button type='button' onClick={() => handleToastToggle("Error", "error")} className='bg-black text-white rounded-md px-4 py-2 cursor-pointer'>
                    Error
                </button>
                <button type='button' onClick={() => handleToastToggle("Info", "info")} className='bg-black text-white rounded-md px-4 py-2 cursor-pointer'>
                    Info
                </button>
            </div>
        </>
    )
}
