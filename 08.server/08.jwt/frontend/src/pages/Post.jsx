import React, { useEffect, useState } from 'react'
import Form from '../components/Form'
import axios from 'axios'
import moment from "moment"

const Posts = () => {
  const [posts, set_posts] = useState([])

  useEffect(() => {
    getAllPosts()
  }, [])

  const getAllPosts = async () => {
    try {
      const resp = await axios.get("http://localhost:3001/api/v1/post")
      set_posts(resp.data.data)

    } catch (error) {
      console.error(error);
    }
  }

  const delete_post = async (postId) => {
    if (!postId) {
      alert("post id is required")
      return
    }
    try {
      const resp = await axios.delete(`http://localhost:3001/api/v1/post/${postId}`)
      alert("post deleted")
      getAllPosts()

    } catch (error) {
      console.error(error);

    }
  }

  const edit_post = async (postId, title, description) => {
    if (!postId) {
      alert("post id is required")
      return
    }

    const updatedTitle = prompt("Enter updated title", title)
    const updatedDesc = prompt("Enter updated description", description)

    try {
      const resp = await axios.put(`http://localhost:3001/api/v1/post/${postId}`, {
        title: updatedTitle,
        description: updatedDesc
      })
      alert("post updated")
      getAllPosts()

    } catch (error) {
      console.error(error);

    }
  }

  return (
    <div>
      <Form getAllPosts={getAllPosts} />
      <div className="result flex justify-start items-start gap-2 p-2 flex-wrap">
        {posts.length ? posts.map((singlePost, index) => {
          return (
            <div key={index} className='border-1 p-2 flex flex-col gap-2 rounded-lg'>
              <b>{moment(singlePost.id).fromNow()}</b>
              <h2 className='font-bold text-xl'>{singlePost.title}</h2>
              <p>{singlePost.description}</p>
              <div className='flex gap-2'>
                <button
                  onClick={() => edit_post(singlePost._id, singlePost.title, singlePost.description)}
                  className='cursor-pointer bg-green-800 hover:bg-green-600 transition-colors duration-400 text-xs text-white py-2 px-4 rounded-md'>Edit</button>
                <button
                  onClick={() => delete_post(singlePost._id)}
                  className='cursor-pointer bg-red-800 hover:bg-red-600 transition-colors duration-400 text-xs text-white py-2 px-4 rounded-md'>Delete</button>
              </div>
            </div>
          )
        }) : <div className='text-center w-full mt-8'>No post found</div>}
      </div>
    </div>
  )
}

export default Posts
