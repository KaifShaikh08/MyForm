import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js";
import cors from "cors";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

export const app = express();

config({
  path: "./data/config.env",
});

//using middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/user", userRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Nice Noob");
});
