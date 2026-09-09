import React from 'react'
import Button from "./Button"
import { store } from '../store/states'
import { Link } from "react-router-dom"

const Header = () => {
    const { global_logout, user } = store()

    const logout = () => {
        localStorage.removeItem("token")
        global_logout()
    }

    const headerOptions = [
        {
            label: "Home",
            path: "/"
        },
        {
            label: "Chat",
            path: "/chat"
        },
    ]

    return (
        <div
            className='w-full border-b p-4 flex justify-between items-center'
        >
            <Link to="/profile">{user.firstname} {user.lastname}</Link>

            <div className='flex gap-2'>
                {headerOptions.map((option, i) => {
                    return (
                        <Link key={i} to={option.path}>{option.label}</Link>
                    )
                })}
            </div>

            <Button onClick={logout}>Logout</Button>
        </div>
    )
}

export default Header