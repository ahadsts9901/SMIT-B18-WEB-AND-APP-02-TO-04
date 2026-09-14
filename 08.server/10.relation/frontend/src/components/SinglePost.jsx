import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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
                    getAllPosts={getSinglePost}
                />
                <h2 className='text-xl my-4'>Liked by:</h2>
                <div className='mt-4 flex gap-2'>
                    {singlePost?.likes?.map((like, i) => {
                        return (
                            <Link
                                to={`/profile/${like?._id}`}
                                key={i}
                                className='w-fit flex items-center gap-2 border rounded-full px-2 hover:bg-gray-300 transition-colors'>
                                <img src={like?.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS73K-hNaw6ETaPB2zU7PqIiWDgchEYFoDcaRJLGtHYRg&s=10"}
                                    alt='profile-picture'
                                    className='w-4 h-4 rounded-full border'
                                />
                                {like?.firstname} {like?.lastname}
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default SinglePost