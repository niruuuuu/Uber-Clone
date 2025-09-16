import { app } from "./app.js";
import dotenv from "dotenv";
import connectToDB from "./db/index.js";

dotenv.config({ path: "./.env" });

connectToDB()
.then(() => {
  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on ${process.env.PORT}`)
  })

  app.on("error", (error) => {
    console.log(`MongoDB Connection failed || Error: ${error.message}`)
  })
})
.catch((error) => {
  console.log(`MongoDB Connection failed || Error: ${error.message}`)
})