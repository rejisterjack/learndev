import mongoose from "mongoose"
require("dotenv").config()

const dbUrl = process.env.DB_URL || ""

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl).then((data) => {
      console.log("MongoDB connected", data.connection.host)
    })
  } catch (error: any) {
    console.error(error.message)
    process.exit(1)
  }
}

export default connectDB