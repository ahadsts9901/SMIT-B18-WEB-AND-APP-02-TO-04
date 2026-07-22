import express from "express"

const router = express.Router()

router.post("/comment", (req, res, next) => {
    // some work
    res.send("comment v2 done")
})

router.get("/comment", (req, res, next) => {
    // some work
    res.send("comment v2 get")
})

router.put("/comment", (req, res, next) => {
    // some work
    res.send("comment v2 edit")
})

router.delete("/comment", (req, res, next) => {
    // some work
    res.send("comment v2 delete")
})

export default router