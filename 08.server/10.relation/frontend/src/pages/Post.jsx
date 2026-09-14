import React, { useEffect, useState } from 'react'
import Form from '../components/Form'
import axios from 'axios'
import moment from "moment"
import { baseUrl } from '../core'
import Header from '../components/Header'
import { store } from '../store/states'
import { Post } from '../components/Post'
import Input from '../components/Input'
import { useDebounce } from '../hooks/useDebounce'
import Button from '../components/Button'

const Posts = () => {
  const [posts, set_posts] = useState([])
  const [searchText, setSearchText] = useState('')
  const [totalPosts, set_totalPosts] = useState(0)

  // Debounce the input value by 500ms
  const debouncedSearchText = useDebounce(searchText, 500)

  // Fetch posts whenever the debounced search text updates
  useEffect(() => {
    getAllPosts(debouncedSearchText)
  }, [debouncedSearchText])

  const getAllPosts = async (searchText = "") => {
    try {
      const resp = await axios.get(`${baseUrl}/api/v1/post?q=${searchText}&skip=${posts?.length}`, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      set_posts([...posts, ...resp.data.data])
      set_totalPosts(resp.data.totalPosts)

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Header />
      <Form getAllPosts={() => getAllPosts(debouncedSearchText)}
      />
      <div className='w-[800px] m-auto my-8'>
        <Input
          type='search'
          placeholder="Search post..."
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="m-auto result flex flex-col justify-center items-start gap-8 p-2 flex-wrap w-[600px]">
        {posts.length ? posts.map((singlePost, index) => {
          return (
            <Post
              singlePost={singlePost}
              key={index}
              getAllPosts={() => getAllPosts(debouncedSearchText)}
            />
          )
        }) : <div className='text-center w-full mt-8'>No post found</div>}
      </div>
      {posts.length === totalPosts ?
        null
        : <div className='w-full flex justify-center my-8'>
          <Button onClick={getAllPosts}>Load More</Button>
        </div>}
    </div>
  )
}

export default Posts
