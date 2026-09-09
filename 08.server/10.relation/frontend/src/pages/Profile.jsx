import React, { useEffect, useState } from 'react'
import { store } from '../store/states'
import { FaPencilAlt } from "react-icons/fa";
import axios from "axios"
import { baseUrl } from "../core"
import Input from "../components/Input"
import Button from "../components/Button"
import { Link, useParams } from "react-router-dom"
import moment from 'moment';
import { FaRegThumbsUp as LikeEmpty, FaThumbsUp as LikeFill } from "react-icons/fa";
import { FaRegComment as CommentIcon } from "react-icons/fa";
import { IoMdShare as ShareIcon } from "react-icons/io";
import { Post } from '../components/Post';

const Profile = () => {
  const params = useParams()
  const userId = params.userId
  const { user, global_login } = store()
  
  const [user_data, set_user_data] = useState(null)

  const editProfile = async () => {
    const firstname = prompt("Enter firstname", user.firstname)
    const lastname = prompt("Enter lastname", user.lastname)

    try {
      const resp = await axios.put(`${baseUrl}/api/v1/profile`, {
        firstname,
        lastname
      }, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      global_login({
        ...user,
        firstname: firstname,
        lastname: lastname,
      })
      set_user_data({
        ...user,
        firstname: firstname,
        lastname: lastname,
      })

    } catch (error) {
      console.error(error)
      alert(error.response.data.message)
    }

  }

  const [current_password, set_current_password] = useState("")
  const [new_password, set_new_password] = useState("")
  const [rep_password, set_rep_password] = useState("")

  const updatePassword = async () => {
    console.log("updatePassword running..")

    if (!current_password) {
      alert("current_password is required")
      return
    }

    if (!new_password) {
      alert("new_password is required")
      return
    }

    if (rep_password !== new_password) {
      alert("password do not match")
      return
    }

    try {
      const resp = await axios.put(`${baseUrl}/api/v1/password`, {
        currentPassword: current_password,
        newPassword: new_password,
      }, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      alert("Password updated")
      set_current_password("")
      set_new_password("")
      set_rep_password("")

    } catch (error) {
      console.error(error)
      alert(error.response.data.message)
    }

  }

  const upload_file = async (file) => {
    if (!file) return

    const formData = new FormData()
    formData.append("my-file", file)

    try {
      const resp = await axios.put(`${baseUrl}/api/v1/profile-picture`,
        formData, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      global_login({
        ...user,
        profilePicture: resp.data.url
      })
      set_user_data({
        ...user_data,
        profilePicture: resp.data.url
      })

    } catch (error) {
      console.error(error);
      alert(error.response.data.message)

    }

  }

  useEffect(() => {
    getOtherUserProfile()
    getOtherPosts()
  }, [])

  const [posts, set_posts] = useState([])

  const getOtherUserProfile = async () => {
    try {
      const resp = await axios.get(`${baseUrl}/api/v1/profile/${userId || user._id}`, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      set_user_data(resp.data.data)

    } catch (error) {
      console.error(error);
    }
  }

  const getOtherPosts = async () => {
    try {
      const resp = await axios.get(`${baseUrl}/api/v1/profile/posts/${userId || user._id}`, {
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
    <div className='w-full p-4 flex flex-col gap-4 pb-32'>
      {/* profile edit */}
      <h2 className='text-3xl font-bold'>
        <span className='cursor-pointer' onClick={() => window.history.back()}>{"<"}</span>
        {user_data?.firstname} {user_data?.lastname} Profile
      </h2>

      <div className='relative w-64 h-64'>
        <img src={user_data?.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS73K-hNaw6ETaPB2zU7PqIiWDgchEYFoDcaRJLGtHYRg&s=10"} alt="profile"
          className='w-64 h-64 rounded-full border'
        />

        <input
          type="file"
          hidden id='profile-selector'
          accept='image/*'
          onChange={(e) => upload_file(e.target.files[0])}
        />

        {
          user_data?._id === user._id ?
            <label htmlFor="profile-selector">
              <FaPencilAlt
                className='cursor-pointer absolute right-4 bottom-4 bg-white border w-8 h-8 p-2 rounded-full'
              />
            </label>
            : null
        }

      </div>

      <h3 className='w-full text-2xl flex gap-2'>
        {user_data?.firstname} {user_data?.lastname}
        {
          user_data?._id === user._id ? <FaPencilAlt className='cursor-pointer'
            onClick={editProfile}
          /> : null
        }
      </h3>

      <h3 className='w-full text-2xl flex gap-2'>
        Joined: {moment(user_data?.createdAt).format("DD-MM-YYYY")}
      </h3>

      {/* edit password */}

      {user_data?._id === user._id ? <>
        <h2 className='text-3xl font-bold mt-8'>Security</h2>
        <p>update your password</p>

        <Input
          placeholder="Enter current password"
          label="Current Password"
          type="password"
          value={current_password} onChange={(e) => set_current_password(e.target.value)}
        />
        <Input
          placeholder="Enter new password"
          label="New Password"
          type="password"
          value={new_password} onChange={(e) => set_new_password(e.target.value)}
        />
        <Input
          placeholder="Confirm new password"
          label="Confirm new Password"
          type="password"
          value={rep_password} onChange={(e) => set_rep_password(e.target.value)}
        />

        <Button onClick={updatePassword}>Update Password</Button>
      </> : null}

      {/* all posts of a user */}
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

export default Profile