import express from "express"

const router = express.Router()

router.get("/posts", (req, res, next) => {
    res.send("v2 posts")
})

router.get("/profile", (req, res, next) => {
    res.send("v2 profile")
})

router.get("/comment", (req, res, next) => {
    res.send("v2 comment")
})

export default router