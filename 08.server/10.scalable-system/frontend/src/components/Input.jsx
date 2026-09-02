import React from 'react'

const Input = ({ placeholder, type = "text", onChange, value, label }) => {
    return (
        <div className='flex flex-col'>
            <p>{label}</p>
            <input type={type} placeholder={placeholder}
                value={value} onChange={onChange}
                required
                className='border border-blue-600 rounded-sm px-2'
            />
        </div>
    )
}

export default Input
