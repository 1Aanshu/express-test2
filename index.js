require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const indexRouter = require("./routes");
const PORT = process.env.PORT;
const app = express();

mongoose.connect(process.env.DB).then(() => {
  console.log("Database connected");
});

app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));

app.use("/", indexRouter);

app.use((err, req, res, next) => {
  err = err ? err.toString() : "Something went wrong";
  res.status(500).json({ msg: err });
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT} port`);
});
