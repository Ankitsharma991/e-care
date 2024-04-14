const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;

require("./db");
const authRoutes = require("./routes/authRoutes");

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Shareify!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
