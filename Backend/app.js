import express from "express";
import cors from "cors"

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: "20kb" }))

// routes
import userRoute from "./routes/user.route.js"
app.use("/users", userRoute)

export { app }
