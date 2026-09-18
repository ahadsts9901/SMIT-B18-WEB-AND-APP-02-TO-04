import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { baseUrl } from "../core"

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, set_email] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // validations lagana hai idher

      // api call
      const resp = await axios.post(`${baseUrl}/api/v1/forgot-password`, {
        email: email,
      })

      navigate("/reset-password", {
        state: {
          email: email
        }
      })

    } catch (error) {
      console.error(error);
      alert(error.response.data.message)
    }
  }

  // const send_otp = async () => {
  //   try {
  //     await axios.post(`${baseUrl}/api/v1/forgot-password`, {
  //       email: location?.state?.email
  //     })
  //   } catch (error) {
  //     console.error(error);
  //     alert(error?.response?.data?.message)
  //   }
  // }

  return (
    <form
      onSubmit={handleSubmit}
      className='mt-8 w-full flex flex-col justify-center items-center gap-2'>
      <h2>Forgot Password</h2>
      <Input
        placeholder="Enter email"
        label="email"
        value={email} onChange={(e) => set_email(e.target.value)}
      />
      {/* <p>Dont Get? <b className='text-blue-500 cursor-pointer' onClick={send_otp}>Resend OTP</b></p> */}
      <Button>Forgot Password</Button>
    </form>
  )
}

export default ForgotPassword