import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { baseUrl } from "../core"

const Signup = () => {
  const navigate = useNavigate()

  const [firstname, set_firstname] = useState("")
  const [lastname, set_lastname] = useState("")
  const [email, set_email] = useState("")
  const [password, set_password] = useState("")
  const [rep_password, set_rep_password] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // validations lagana hai idher

      // api call
      const resp = await axios.post(`${baseUrl}/api/v1/signup`, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      })
      alert("Signup Done")
      navigate("/login")

    } catch (error) {
      console.error(error);
      alert(error.response.data.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='mt-8 w-full flex flex-col justify-center items-center gap-2'>
      <h2>Signup</h2>
      <Input
        placeholder="Enter firstname"
        label="firstname"
        value={firstname} onChange={(e) => set_firstname(e.target.value)}
      />
      <Input
        placeholder="Enter lastname"
        label="lastname"
        value={lastname} onChange={(e) => set_lastname(e.target.value)}
      />
      <Input
        placeholder="Enter email"
        label="email"
        value={email} onChange={(e) => set_email(e.target.value)}
      />
      <Input
        placeholder="Enter password"
        label="password"
        type="password"
        value={password} onChange={(e) => set_password(e.target.value)}
      />
      <Input
        placeholder="Confirm password"
        label="confirm password"
        type="password"
        value={rep_password} onChange={(e) => set_rep_password(e.target.value)}
      />

      <p>Already have an account? <Link className='text-blue-500' to="/login">Login</Link></p>

      <Button>Signup</Button>
    </form>
  )
}

export default Signup