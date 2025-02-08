import { Redis } from "ioredis"
require("dotenv").config()

const redisClient = () => {
  if (process.env.REDIS_URL) {
    console.log("Redis URL is provided")
    return process.env.REDIS_URL
  }
  throw new Error("Redis URL is not provided")
}

export const redis = new Redis(redisClient())
