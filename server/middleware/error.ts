import type { NextFunction, Request, Response } from "express"
import ErrorHandler from "../utils/ErrorHandler"

const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || "error"
  err.message = err.message || "Internal Server Error"

  // Wrong mongoose object id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`
    err = new ErrorHandler(404, message)
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`
    err = new ErrorHandler(400, message)
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = "JSON Web Token is invalid. Try again!!!"
    err = new ErrorHandler(401, message)
  }

  // Expired JWT error
  if (err.name === "TokenExpiredError") {
    const message = "JSON Web Token is expired. Try again!!!"
    err = new ErrorHandler(401, message)
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  })
}

export default ErrorMiddleware