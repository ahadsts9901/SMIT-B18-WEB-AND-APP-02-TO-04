import express from 'express';

const app = express()
const port = 5002

app.get("/", (req, res, next) => {
    res.send("i am home route")
})

app.get("/profile", (req, res, next) => {
    console.log("profie running")
    res.send({
        username: "zooland",
        databse: "mango db",
        fifa: "ahmed",
        kuch_bhi: "something",
        address: "some address"
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// http://192.168.21.230:5002/

// REST APIS

// GET      (get data)
// POST     (add data)
// PUT      (edit data)
// PATCH    (update data)
// DELETE   (delete data)
