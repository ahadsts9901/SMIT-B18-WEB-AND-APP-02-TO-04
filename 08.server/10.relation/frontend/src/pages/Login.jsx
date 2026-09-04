import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { Link, useNavigate } from "react-router-dom"
import { baseUrl } from "../core"
import axios from "axios"
import { store } from '../store/states'

const Login = () => {
  const { global_login } = store()

  const [email, set_email] = useState("")
  const [password, set_password] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // validations lagana hai idher

      // api call
      const resp = await axios.post(`${baseUrl}/api/v1/login`, {
        email: email,
        password: password,
      })
      alert("Login Done")
      localStorage.setItem("token", resp.data.data.token)
      global_login(resp.data.data.user)
      navigate("/")

    } catch (error) {
      console.error(error);
      alert(error.response.data.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='mt-8 w-full flex flex-col justify-center items-center gap-2'>
      <h2>Login</h2>
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

      <p>Dont have an account? <Link className='text-blue-500' to="/signup">Signup</Link></p>

      <Button type="submit">Login</Button>
    </form>
  )
}

export default Login