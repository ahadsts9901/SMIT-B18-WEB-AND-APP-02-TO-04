import React from 'react'

const Button = ({ onClick, children, type }) => {
    return (
        <button
            type="submit"
            className='bg-blue-500 rounded-sm w-[200px] cursor-pointer text-white'
            onClick={onClick}>
            {children}
        </button>
    )
}

export default Button