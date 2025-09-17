import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: "20kb" }))
app.use(cookieParser())

// routes
import userRoute from "./routes/user.route.js"
import captainRoute from "./routes/captain.route.js"

app.use("/users", userRoute)
app.use("/captain", captainRoute)

export { app }
