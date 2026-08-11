import React, { useRef } from 'react'
import axios from "axios"

const Form = ({getAllPosts}) => {
    const titleRef = useRef(null)
    const descRef = useRef(null)

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!titleRef.current.value) {
            alert("title is required")
            return
        }

        if (!descRef.current.value) {
            alert("title is required")
            return
        }

        try {
            const resp = await axios.post("http://localhost:3001/api/v1/post", {
                title: titleRef.current.value,
                description: descRef.current.value
            })
            alert("Post Created")
            getAllPosts()
            event.target.reset()

        } catch (error) {
            console.error(error)
        }

    }

    return (
        <form className='flex flex-col justify-center items-center gap-4 p-4'
            onSubmit={handleSubmit}
        >
            <h2 className='w-full text-center font-bold uppercase text-2xl'>MongoDB CRUD</h2>

            <input type="text"
                placeholder='title... '
                className='border-2 p-2 rounded-lg w-full'
                ref={titleRef} required
            />

            <textarea
                placeholder='description...'
                className='border-2 p-2 rounded-lg w-full'
                ref={descRef} required
            ></textarea>

            <button
                className='bg-black text-white rounded-lg px-16 py-2 cursor-pointer hover:bg-gray-600 transition-colors duration-400 ml-auto'
                type='submit'
            >Submit</button>
        </form>
    )
}

export default Form