import express from "express"
import cors from "cors"
import { postRouter } from "./routes/index.mjs"

const app = express()
const port = 5002

// body parser middleware
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    methods: "*"
}))

app.get("/", (req, res, next) => {
    res.send("hello world")
})

app.use("/api/v1", postRouter)

app.listen(port, () => console.log(`server is running... on ${port}`))
