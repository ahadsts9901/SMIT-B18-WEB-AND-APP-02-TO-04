import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./main.css"
import moment from 'moment'

const App = () => {
  const [cruises, set_cruises] = useState([])

  const getAllPosts = async () => {
    const response = await axios.get("https://api.luxetravelplans.com/api/v1/cruises")
    set_cruises(response.data.data)
  }

  console.log(cruises)

  useEffect(() => {
    getAllPosts()
  }, [])

  return (
    <div
      className='flex flex-col justify-center items-center gap-[2em]'
    >
      <div
        className='flex justify-center items-center text-white cursor-pointer w-[50px] h-[50px] bg-green-600 rounded-full text-center fixed bottom-[1em] right-[1em]'
      >
        hello
      </div>

      <ul className='list-decimal'>
        <li>HTML</li>
        <li>CSS</li>
        <li>JS</li>
        <li>React</li>
        <li>Firebase</li>
      </ul>

      {cruises.map((singleCruise, index) => {
        return (
          <div key={index}
            className='cruise-card m-4 bg-orange-200 p-[20px] rounded-xl border-2 border-green-600 border-dashed'
          >
            <b className='font-[serif]'>{singleCruise.duration}</b>
            <h2 className='text-2xl uppercase'>{singleCruise.title}</h2>
            <b className='text-red-600 cursor-pointer'>{singleCruise.price}</b>
            <p>{moment(singleCruise.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
            <img src={singleCruise.image}
              className='rounded-xl w-100 h-80 object-cover'
            />
            <a target='_blank' href={singleCruise.link}
              className='text-white underline font-bold bg-blue-500 rounded-[6px] p-4 md:bg-red-600 lg:bg-pink-700 hover:bg-black'
            >View Details</a>
          </div>
        )
      })}
    </div>
  )
}

export default App