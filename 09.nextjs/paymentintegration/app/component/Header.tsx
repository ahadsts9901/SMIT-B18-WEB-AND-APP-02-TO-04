import Link from 'next/link'
import React from 'react'

const Header = () => {
    const options = [
        {
            path: "/",
            label: "Home",
        },
        {
            path: "/about",
            label: "About",
        },
        {
            path: "/post",
            label: "Post",
        },
        {
            path: "/contact",
            label: "Contact",
        },
    ]

    return (
        <div className='w-full bg-green-300 p-4 x-8 flex gap-4 justify-center'>
            {options.map((opt, i) => {
                return (
                    <Link
                        key={i}
                        href={opt.path}
                    >{opt.label}</Link>
                )
            })}
        </div>
    )
}

export default Header