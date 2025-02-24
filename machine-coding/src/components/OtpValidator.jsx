import React, { useEffect, useRef, useState } from 'react'

export default function OtpValidator() {

    const emptyArr = new Array(4).fill("");
    const refs = [useRef(), useRef(), useRef(), useRef()]

    const [missingInput, setMissingInput] = useState(emptyArr);
    const [input, setInput] = useState(emptyArr);
    const CODE = 1234

    const handleSubmit = () => {
        const missing = input?.map((item, index) => {
            if (item == "") return index
        }).filter((data) => (data || data == 0))
        console.log(missing)
        setMissingInput(missing)

        const userInput = input.join("");
        const isMatched = userInput == CODE
        const msg = isMatched ? "CODE is valid" : "CODE is invalid";
        alert(msg)
    }

    const handleInputChange = (e, index) => {
        const { value } = e.target
        if (!/^\d?$/.test(value)) return; // Allow only single digit (0-9)

        const copyInputs = [...input]
        copyInputs[index] = value;
        setInput(copyInputs)

        if (value && index < input.length - 1) {
            refs[index + 1].current.focus();
        }

    }

    const handleKeyDown = (e, index) => {
        if (e.key == "Backspace" && !input[index]) {
            const copyInputs = [...input]
            copyInputs[index] = ""
            setInput(copyInputs)
            if (index > 0) { refs[index - 1].current.focus() }
        }
    }
    const handlePaste = (e) => {
        const data = e.clipboardData.getData("text");

        if (!Number(data) || data.length !== input.length)
            return;

        const splitData = data.split("");
        setInput(splitData);
        refs[input.length - 1].current.focus();
    }
    useEffect(() => {
        refs[0].current.focus();
    }, [])
    return (
        <div className='h-screen flex space-y-5  flex-col items-center justify-center'>
            <h1 className='text-3xl font-medium'>Two-Factor code input</h1>
            <div className="flex space-x-6">

                {emptyArr.map((item, i) => (

                    <input
                        key={i}
                        ref={refs[i]}
                        value={input[i]}
                        type='text'
                        maxLength={1}
                        onPaste={handlePaste}
                        onChange={(e) => handleInputChange(e, i)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                        className={`text-center border-2   max-w-24 px-6 py-2 rounded-lg text-3xl focus:outline-green-600
                            ${missingInput.includes(i) ? "border-red-500" : "border-gray-400"}
                            `} />
                ))}
            </div>
            <button className='bg-purple-600 text-white font-medium cursor-pointer px-6 py-2 rounded-lg ' onClick={handleSubmit}>Submit</button>
        </div>
    )
}
