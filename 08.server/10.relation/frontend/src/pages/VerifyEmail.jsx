import React, { useState } from 'react'
import OTPInput from '../components/OtpInput'
import Button from '../components/Button'
import { Link, useNavigate } from "react-router-dom"

const VerifyEmail = () => {
  const [otp, set_otp] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {


    } catch (error) {
      console.error(error);
      // alert(error.response.data.message)
    }
  }
  console.log(otp)
  return (
    <form
      onSubmit={handleSubmit}
      className='mt-8 w-full flex flex-col justify-center items-center gap-2'>
      <h2>Verify Email</h2>
      <p>Please enter an OTP code sent to {"email aega"}</p>
      <OTPInput
        value={otp} onChange={(e) => set_otp(e)}
      />

      <p>Dont Get? <Link className='text-blue-500' to="/signup">Resend OTP</Link></p>

      <Button type="submit">Verify Email</Button>
    </form>
  )
}

export default VerifyEmail