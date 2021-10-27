import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // body-parser

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Route Handler Part

// custom error handler Part

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(
    colors.magenta.bold(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  )
);

export default server;
