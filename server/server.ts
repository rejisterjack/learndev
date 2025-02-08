import express from "express"
const app = express()
import cors from "cors"
import cookieParser from "cookie-parser"
import ErrorMiddleware from "./middleware/error"
import dotenv from "dotenv"
dotenv.config()

// body parser
app.use(
  express.json({
    limit: "50mb",
  })
)

// cookie parser
app.use(cookieParser())

// cors
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
)

// testing api
app.get("/test", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  })
})

// unknown route
app.all("*", (req, res, next) => {
  class AppError extends Error {
    statusCode: number
    constructor(message: string, statusCode: number) {
      super(message)
      this.statusCode = statusCode
    }
  }

  const err = new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  next(err)
})

// error middleware
app.use(ErrorMiddleware)

export default app
