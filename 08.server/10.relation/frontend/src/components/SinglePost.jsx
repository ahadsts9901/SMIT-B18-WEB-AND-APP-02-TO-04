import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../core'
import { Post } from './Post'
import Header from "./Header"

const SinglePost = () => {
    const params = useParams()
    const [singlePost, setSinglePost] = useState(null)

    useEffect(() => {
        getSinglePost()
    }, [])

    const getSinglePost = async () => {
        try {
            const resp = await axios.get(`${baseUrl}/api/v1/post/${params.postId}`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            setSinglePost(resp.data.data)

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Header />
            <div className='p-4 w-[80%] m-auto'>
                <Post
                    singlePost={singlePost}
                />
            </div>
        </>
    )
}

export default SinglePost