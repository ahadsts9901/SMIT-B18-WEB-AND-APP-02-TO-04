import express from "express"

const router = express.Router()

const allPosts = []

router.post("/post", (req, res, next) => {

    if (!req.body.title) {
        res.status(400).send({
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

    res.send({
        message: "post created"
    })
})

router.get("/post", (req, res, next) => {
    res.send({
        message: "all posts fetched",
        data: allPosts
    })
})

router.get("/post/:postId", (req, res, next) => {
    res.send("post get single")
})

router.put("/post/:postId", (req, res, next) => {
    res.send("post edited")
})

router.delete("/post/:postId", (req, res, next) => {
    res.send("post deleted")
})

export default router
