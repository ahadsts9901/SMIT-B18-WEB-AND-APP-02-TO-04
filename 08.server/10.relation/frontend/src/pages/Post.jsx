import React, { useEffect, useState } from 'react'
import Form from '../components/Form'
import axios from 'axios'
import moment from "moment"
import { baseUrl } from '../core'
import Header from '../components/Header'
import { store } from '../store/states'
import { Post } from '../components/Post'

const Posts = () => {
  const [posts, set_posts] = useState([])

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

  return (
    <div>
      <Header />
      <Form getAllPosts={getAllPosts} />
      <div className="result flex justify-start items-start gap-2 p-2 flex-wrap">
        {posts.length ? posts.map((singlePost, index) => {
          return (
            <Post
              singlePost={singlePost}
              key={index}
            />
          )
        }) : <div className='text-center w-full mt-8'>No post found</div>}
      </div>
    </div>
  )
}

export default Posts
