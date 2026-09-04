import React, { useEffect, useState } from 'react'
import Form from '../components/Form'
import axios from 'axios'
import moment from "moment"
import { baseUrl } from '../core'
import Header from '../components/Header'
import { store } from '../store/states'
import { FaRegThumbsUp as LikeEmpty, FaThumbsUp as LikeFill } from "react-icons/fa";
import { FaRegComment as CommentIcon } from "react-icons/fa";
import { IoMdShare as ShareIcon } from "react-icons/io";

const Posts = () => {
  const [posts, set_posts] = useState([])
  const { user } = store()

  useEffect(() => {
    getAllPosts()
  }, [])

  const getAllPosts = async () => {
    try {
      const resp = await axios.get(`${baseUrl}/api/v1/post`, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
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
      const resp = await axios.delete(`${baseUrl}/api/v1/post/${postId}`, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
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
      const resp = await axios.put(`${baseUrl}/api/v1/post/${postId}`, {
        title: updatedTitle,
        description: updatedDesc
      }, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      alert("post updated")
      getAllPosts()

    } catch (error) {
      console.error(error);

    }
  }

  return (
    <div>
      <Header />
      <Form getAllPosts={getAllPosts} />
      <div className="result flex justify-start items-start gap-2 p-2 flex-wrap">
        {posts.length ? posts.map((singlePost, index) => {
          return (
            <div key={index} className='border w-full p-2 flex flex-col gap-2 rounded-lg'>
              <div className='w-full flex gap-2 items-center'>
                <img src={singlePost.userId.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS73K-hNaw6ETaPB2zU7PqIiWDgchEYFoDcaRJLGtHYRg&s=10"} alt="profile-picture"
                  className='w-12 h-12 rounded-full border'
                />
                <h3 className='text-xl font-bold text-left'>{singlePost.userId.firstname} {singlePost.userId.lastname}</h3>

                <b className='ml-auto'>{moment(singlePost.id).fromNow()}</b>
              </div>
              <h2 className='font-bold text-xl'>{singlePost.title}</h2>
              <p>{singlePost.description}</p>
              {user._id === singlePost.userId._id ? <div className='flex gap-2'>
                <button
                  onClick={() => edit_post(singlePost._id, singlePost.title, singlePost.description)}
                  className='cursor-pointer bg-green-800 hover:bg-green-600 transition-colors duration-400 text-xs text-white py-2 px-4 rounded-md'>Edit</button>
                <button
                  onClick={() => delete_post(singlePost._id)}
                  className='cursor-pointer bg-red-800 hover:bg-red-600 transition-colors duration-400 text-xs text-white py-2 px-4 rounded-md'>Delete</button>
              </div> : null}
              <div className='w-full grid grid-cols-3 gap-2'>
                <button className='cursor-pointer p-2 w-full flex justify-center items-center gap-2 bg-gray-300 hover:bg-gray-500 hover:text-white rounded-md transition-colors duration-200'> <LikeEmpty /> Like</button>
                <button className='cursor-pointer p-2 w-full flex justify-center items-center gap-2 bg-gray-300 hover:bg-gray-500 hover:text-white rounded-md transition-colors duration-200'> <CommentIcon /> Comment</button>
                <button className='cursor-pointer p-2 w-full flex justify-center items-center gap-2 bg-gray-300 hover:bg-gray-500 hover:text-white rounded-md transition-colors duration-200'><ShareIcon /> Share</button>
              </div>
            </div>
          )
        }) : <div className='text-center w-full mt-8'>No post found</div>}
      </div>
    </div>
  )
}

export default Posts
