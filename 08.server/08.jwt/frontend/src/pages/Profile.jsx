import React, { useState } from 'react'
import { store } from '../store/states'
import { FaPencilAlt } from "react-icons/fa";
import axios from "axios"
import { baseUrl } from "../core"
import Input from "../components/Input"
import Button from "../components/Button"

const Profile = () => {
  const { user, global_login } = store()

  const editProfile = async () => {
    const firstname = prompt("Enter firstname", user.firstname)
    const lastname = prompt("Enter lastname", user.lastname)

    try {
      const resp = await axios.put(`${baseUrl}/api/v1/profile`, {
        firstname,
        lastname
      }, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      global_login({
        ...user,
        firstname: firstname,
        lastname: lastname,
      })

    } catch (error) {
      console.error(error)
      alert(error.response.data.message)
    }

  }

  const [current_password, set_current_password] = useState("")
  const [new_password, set_new_password] = useState("")
  const [rep_password, set_rep_password] = useState("")

  const updatePassword = async () => {
    console.log("updatePassword running..")

    if (!current_password) {
      alert("current_password is required")
      return
    }

    if (!new_password) {
      alert("new_password is required")
      return
    }

    if (rep_password !== new_password) {
      alert("password do not match")
      return
    }

    try {
      const resp = await axios.put(`${baseUrl}/api/v1/password`, {
        currentPassword: current_password,
        newPassword: new_password,
      }, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      alert("Password updated")
      set_current_password("")
      set_new_password("")
      set_rep_password("")

    } catch (error) {
      console.error(error)
      alert(error.response.data.message)
    }

  }

  return (
    <div className='w-full p-4 flex flex-col gap-4 pb-32'>
      {/* profile edit */}
      <h2 className='text-3xl font-bold'>Your Profile</h2>

      <img src={user.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS73K-hNaw6ETaPB2zU7PqIiWDgchEYFoDcaRJLGtHYRg&s=10"} alt="profile"
        className='w-64 h-64 rounded-full border'
      />

      <h3 className='w-full text-2xl flex gap-2'>
        {user.firstname} {user.lastname}
        <FaPencilAlt className='cursor-pointer'
          onClick={editProfile}
        />
      </h3>


      {/* edit password */}
      <h2 className='text-3xl font-bold mt-8'>Security</h2>
      <p>update your password</p>

      <Input
        placeholder="Enter current password"
        label="Current Password"
        type="password"
        value={current_password} onChange={(e) => set_current_password(e.target.value)}
      />
      <Input
        placeholder="Enter new password"
        label="New Password"
        type="password"
        value={new_password} onChange={(e) => set_new_password(e.target.value)}
      />
      <Input
        placeholder="Confirm new password"
        label="Confirm new Password"
        type="password"
        value={rep_password} onChange={(e) => set_rep_password(e.target.value)}
      />

      <Button onClick={updatePassword}>Update Password</Button>

    </div>
  )
}

export default Profile