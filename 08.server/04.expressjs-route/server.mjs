import express from 'express';
import { v1Routes, v2Routes } from "./routes/index.mjs"

const app = express()
const port = process.env.PORT || 5002

// METHOD                     app.get()
// PATH                       '/'
// CONTROLLER / MIDDLEWARE    FUNCTION

app.get('/', (req, res, next) => {
    res.send("hello world expressjs changed 123456")
})

app.get('/about', (req, res, next) => {
    res.send(`
        <h1>About Page</h1>
        <a href="#">click me</a>
        `)
})

app.get('/contact', (req, res, next) => {
    res.send({
        username: "jumbo",
        age: 90,
        languages: ['html', 'css', 'react'],
        isMale: true,
    })
})

// wrong
// createComment, create_comment

// correct
// create-comment

// GET
// POST
// PUT
// DELETE

app.use("/api/v1", v1Routes)
app.use("/api/v2", v2Routes)

app.listen(port, () => {
    console.log("server is running... ")
})

// RULES OF REST APIS

// 1. UNIFORM
// 2. CASE SENSITIVE
// 3. API VERSIONS
