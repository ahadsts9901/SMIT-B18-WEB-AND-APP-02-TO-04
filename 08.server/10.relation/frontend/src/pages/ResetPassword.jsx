import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { baseUrl } from "../core"
import OTPInput from '../components/OtpInput'

const ResetPassword = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [otp, set_otp] = useState("")
  const [password, set_password] = useState("")
  const [rep_password, set_rep_password] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // validations lagana hai idher

      // api call
      const resp = await axios.post(`${baseUrl}/api/v1/forgot-password-complete`, {
        email: location?.state?.email,
        otp: otp,
        newPassword: password
      })

      navigate("/login")

    } catch (error) {
      console.error(error);
      alert(error.response.data.message)
    }
  }

  const send_otp = async () => {
    try {
      await axios.post(`${baseUrl}/api/v1/forgot-password`, {
        email: location?.state?.email
      })
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='mt-8 w-full flex flex-col justify-center items-center gap-2'>
      <h2>Reset Password</h2>

      <p>Please enter an OTP code sent to
        <b> {location?.state?.email}</b>
      </p>

      <OTPInput
        value={otp} onChange={(e) => set_otp(e)}
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

      <p>Dont Get? <b className='text-blue-500 cursor-pointer' onClick={send_otp}>Resend OTP</b></p>
      <Button>Reset Password</Button>
    </form>
  )
}

export default ResetPassword
