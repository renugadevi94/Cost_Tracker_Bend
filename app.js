
const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const transactionRoutes = require("./Routers/Transactions.js");
const userRoutes = require("./Routers/userRouter.js");
dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//atlas url
const url = process.env.MONGO_URL;

//mongodb connect
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to atlas mongodb");
  })
  .catch((err) => {
    console.error(err);
  });

// Router
app.use("/api", transactionRoutes);
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Expense Tracker!");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening on port  ${port}`);
});