import express from "express"

const router = express.Router()

router.get("/posts", (req, res, next) => {
    res.send("v1 posts")
})

router.get("/profile", (req, res, next) => {
    res.send("v1 profile")
})

router.get("/comment", (req, res, next) => {
    res.send("v1 comment")
})


export default router