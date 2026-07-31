import React, { useState } from 'react'
import axios from "axios"

const App = () => {
  const [cityname, set_cityname] = useState("")
  const [result, set_result] = useState(null)
  const [loading, set_loading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!cityname) {
      alert("cityname is required")
      return
    }

    try {
      set_loading(true)
      const resp = await axios.get(`http://localhost:5002/weather?cityName=${cityname}`)

      set_result(resp.data.data)

    } catch (error) {
      console.error(error)
      alert(error.response.data.message)
    } finally {
      set_loading(false)
    }

  }

  return (
    <form
      className='flex flex-col justify-center items-center p-4 gap-4'
      onSubmit={handleSubmit}
    >
      <h2 className='font-bold text-2xl'>Weather App</h2>
      <input type="text"
        className='border-1 py-2 px-4 rounded-md'
        placeholder='Enter your cityname... '
        value={cityname}
        required
        onChange={(e) => set_cityname(e.target.value)}
      />

      <button type='submit'
        className='border-1 py-2 px-4 rounded-md cursor-pointer bg-green-600 text-white font-bold hover:bg-red-400 transition-colors duration-500'
      >Get Weather</button>

      {
        loading ? <p>Loading...</p> :
          <>
            <h2 className='font-bold text-center text-2xl' >{result?.cityName}</h2>
            <h1 className='font-bold text-center text-3xl' >{result?.weather}</h1>
          </>
      }

    </form>
  )
}

export default App