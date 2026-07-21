import express from "express"

const app = express()
const port = 5002

import v1Routes from "./routes/v1/index.mjs"
import v2Routes from "./routes/v2/index.mjs"

app.use("/api/v1", v1Routes)
app.use("/api/v2", v2Routes)

app.listen(port, () => console.log(`server is running... on ${port}`))
