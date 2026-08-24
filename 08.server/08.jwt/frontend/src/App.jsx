import "./App.css"
import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from "react-router-dom"
import Posts from "./pages/Post"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import NotFound from "./pages/NotFound"
import axios from "axios"
import { baseUrl } from "./core"
import { store } from './store/states'
import SplahScreen from "./pages/SplahScreen"

const App = () => {
  const { global_login, global_logout, user, isLogin } = store()

  useEffect(() => {
    get_profile()
  }, [])

  const get_profile = async () => {
    try {
      const resp = await axios.get(`${baseUrl}/api/v1/profile`, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      global_login(resp.data.data)

    } catch (error) {
      console.error(error)
      global_logout()
    }
  }

  return (
    <>
      {isLogin == null ? <SplahScreen /> : null}

      {
        isLogin == true ?
          <Routes>
            <Route path='/' element={<Posts />} />
            <Route path='*' element={<Navigate to="/" />} />
          </Routes> :
          null
      }

      {
        isLogin == false ?
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='*' element={<Navigate to="/login" />} />
          </Routes> :
          null
      }
    </>
  )
}

export default App