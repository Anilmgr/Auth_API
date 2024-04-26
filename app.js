const express = require("express");
const app = express();
const authRoute = require("./routes/auth");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(
    process.env.DB_CONNECT
  )
  .then(() => console.log("Connected to DB!"));

//Middleware
app.use(express.json());


app.use("/api/user", authRoute);

app.listen(8000, () => {
  console.log("Server started");
});
