import express from "express"

const router = express.Router()

let allPosts = []

router.post("/post", (req, res, next) => {

    if (!req.body.title) {
        return res.status(400).send({
            message: "title is required"
        })
    }

    if (!req.body.description) {
        res.status(400).send({
            message: "description is required"
        })
    }

    const newPost = {
        title: req.body.title,
        description: req.body.description,
        id: new Date().getTime(),
    }

    allPosts.unshift(newPost)

    return res.status(201).send({
        message: "post created"
    })
})

router.get("/post", (req, res, next) => {
    return res.status(200).send({
        message: "all posts fetched",
        data: allPosts
    })
})

router.get("/post/:postId", (req, res, next) => {
    const postId = req.params.postId

    if (!postId) {
        return res.status(400).send({
            message: "post id is required"
        })
    }

    const post = allPosts.find((singlePost) => {
        return singlePost.id == postId
    })

    if (!post) {
        return res.status(404).send({
            message: "post not found"
        })
    }

    res.send({
        message: "post fetched",
        data: post
    })
})

router.put("/post/:postId", (req, res, next) => {
    const postId = req.params.postId

    if (!req.body.title) {
        return res.status(400).send({
            message: "title is required"
        })
    }

    if (!req.body.description) {
        res.status(400).send({
            message: "description is required"
        })
    }

    if (!postId) {
        return res.status(400).send({
            message: "post id is required"
        })
    }

    const post = allPosts.find((singlePost) => {
        return singlePost.id == postId
    })

    if (!post) {
        return res.status(404).send({
            message: "post not found"
        })
    }

    const newPosts = allPosts.map((singlePost) => {
        return singlePost.id == postId ?
            {
                ...singlePost,
                title: req.body.title,
                description: req.body.description,
            }
            : singlePost
    })

    allPosts = newPosts

    return res.send({
        message: "post edited"
    })

})

router.delete("/post/:postId", (req, res, next) => {
    const postId = req.params.postId

    if (!postId) {
        return res.status(400).send({
            messge: "post id is required"
        })
    }

    const post = allPosts.find((singlePost) => {
        return singlePost.id == postId
    })

    if (!post) {
        return res.status(404).send({
            message: "post not found"
        })
    }

    const newPosts = allPosts.filter((singlePost) => {
        return singlePost.id != postId
    })

    allPosts = newPosts

    return res.send({
        message: "post deleted"
    })

})

export default router
