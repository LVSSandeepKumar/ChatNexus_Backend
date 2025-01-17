import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const dbURL = process.env.DATABASE_URL;

app.use(cors({
    origin:[process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}))

app.use("/uploads/profiles", express.static("uploads/profiles"));

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);

const server = app.listen(port, () => {
  console.log(`APP is running at http://localhost:${port}`);
});

mongoose
  .connect(dbURL)
  .then(console.log("DB Connection Successfull"))
  .catch((err) => console.log(err.message));
