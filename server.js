import express from "express";
const app = express();
import routes from "./routes.js";
import mongoose from "mongoose";

import cloudinary from "cloudinary";

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/feedbackSystem")
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.log("Error: ", error);
  });
app.use("/api", routes);

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
});

cloudinary.v2.config({
  cloud_name: "dlf6ksyse",
  api_key: "245892724739653",
  api_secret: "5-qhz2zY8d405k0-SVQiaygUkMQ",
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
