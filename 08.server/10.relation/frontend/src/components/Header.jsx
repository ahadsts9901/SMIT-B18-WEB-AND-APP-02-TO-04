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

    return (
        <div
            className='w-full border-b p-4 flex justify-between items-center'
        >
            <Link to="/profile">{user.firstname} {user.lastname}</Link>
            <Button onClick={logout}>Logout</Button>
        </div>
    )
}

export default Header