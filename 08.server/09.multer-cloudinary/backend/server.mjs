import "dotenv/config"
import express from "express"
import { authRoutes, postRoutes, profileRoutes } from "./routes/index.mjs"
import cors from "cors"
import { connect_database } from "./libs/mongodb.mjs"
import { authGuardJWT } from "./middlewares/jwt/index.mjs"

const app = express()

// body parser middleware
app.use(express.json())

// cors middleware
app.use(cors({
    origin: ["http://localhost:5173", "https://smit-b18-web-and-app-02-to-04-ld6e.vercel.app"],
    // methods: ["GET", "POST"]
    methods: "*"
}))

const PORT = process.env.PORT || 3001

app.get("/", (req, res) => {
    res.send("hello world server")
})

app.use("/api/v1",
    authRoutes,
    authGuardJWT,
    postRoutes,
    profileRoutes
)

app.listen(PORT, () => {
    console.log("server is running...")
    connect_database()
})
