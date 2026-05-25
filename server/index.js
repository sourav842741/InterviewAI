import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import connectDb from "./config/connectDb.js"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import interviewRouter from "./routes/interview.route.js"
import paymentRouter from "./routes/payment.route.js"

const app = express()
app.use(cors({
    origin:"https://interviewai-client.onrender.com",
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())

// ================= HEALTH CHECK =================
app.get("/api/health", async (req, res) => {
  try {

    // MongoDB ping
    await mongoose.connection.db.admin().ping();

    res.status(200).json({
      status: "ok",
      db: "connected",
      timestamp: new Date().toISOString(),
    });

  } catch (error) {

    res.status(500).json({
      status: "error",
      db: "disconnected",
      error: error.message,
    });

  }
});

app.use("/api/auth" , authRouter)
app.use("/api/user", userRouter)
app.use("/api/interview" , interviewRouter)
app.use("/api/payment" , paymentRouter)

const PORT = process.env.PORT || 6000
app.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}`)
    connectDb()
})
