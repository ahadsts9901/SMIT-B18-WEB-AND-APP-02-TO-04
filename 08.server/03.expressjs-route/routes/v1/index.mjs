import express from "express"

const router = express.Router()

router.post("/comment", (req, res, next) => {
    // some work
    res.send("comment v1 done")
})

router.get("/comment", (req, res, next) => {
    // some work
    res.send("comment v1 get")
})

router.put("/comment", (req, res, next) => {
    // some work
    res.send("comment v1 edit")
})

router.delete("/comment", (req, res, next) => {
    // some work
    res.send("comment v1 delete")
})

export default router