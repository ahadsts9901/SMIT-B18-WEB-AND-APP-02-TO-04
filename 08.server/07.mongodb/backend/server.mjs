import "dotenv/config"
import express from "express"
import { postRoutes } from "./routes/index.mjs"
import cors from "cors"
import { connect_database } from "./libs/mongodb.mjs"

const app = express()

// body parser
app.use(express.json())

// cors
app.use(cors({
    origin: ["http://localhost:5173", "https://your-frontend.vercel.app"],
    // methods: ["GET", "POST"]
    methods: "*"
}))

const PORT = process.env.PORT || 3001

app.get("/", (req, res) => {
    res.send("hello world server")
})

app.use("/api/v1", postRoutes)

app.listen(PORT, () => {
    console.log("server is running...")
    connect_database()
})
