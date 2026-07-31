import express from "express"
import cors from "cors"

const app = express()
app.use(express.json())

// app.use(cors({
//     origin: "http://localhost:5173"
// }))
app.use(cors())

app.get("/", (req, res, next) => {
    res.send("Hello World")
})

app.get("/weather", (req, res, next) => {
    const cityName = req.query.cityName

    if (!cityName) {
        return res.status(400).send({
            message: "cityname is required"
        })
    }

    setInterval(() => {

    }, 3000)

    const weatherData = [
        {
            cityName: "Karachi",
            weather: "35"
        },
        {
            cityName: "lahore",
            weather: "28"
        },
        {
            cityName: "quetta",
            weather: "10"
        },
        {
            cityName: "mountain",
            weather: "-40"
        },
    ]

    const cityData = weatherData.find((singleCity) => {
        return singleCity.cityName.toLowerCase() === req.query.cityName.toLowerCase()
    })

    if (!cityData) {
        return res.status(404).send({
            message: "city data not found"
        })
    }

    return res.send({
        message: "weather data fetched",
        data: cityData
    })
})

const PORT = process.env.PORT || 5002

app.listen(PORT, () => {
    console.log("server is running")
})
