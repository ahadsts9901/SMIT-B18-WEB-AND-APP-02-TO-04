import React from 'react'

const Post = async (props: any) => {

    const params = await props.params

    return (
        <div>Dynamic Post {params.postId}</div>
    )
}

export default Post