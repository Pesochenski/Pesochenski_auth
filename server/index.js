const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require("./routers/authRouter");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);

dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_BASENAME = process.env.DB_BASENAME;

const url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.c0rup.mongodb.net/${DB_BASENAME}?retryWrites=true&w=majority`;

async function serverStart() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log("server works"));
  } catch (err) {
    console.log(err);
  }
}
serverStart();
