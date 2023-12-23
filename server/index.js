const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dbConnection = require("./Connection/database");
const userRoute = require("./Routes/Userroutes");
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
dbConnection();

app.use("/", userRoute);

app.listen(4001, () => {
  console.log("server is running on port 4001");
});
