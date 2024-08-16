import express from "express";
import http from "http";
import { Server } from "socket.io";
import routes from "./routes.js";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static("public"));

mongoose
  .connect("mongodb://localhost:27017/feedbackSystem")
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.log("Error: ", error);
  });

app.use("/api", routes);

cloudinary.config({
  secure: true,
});

cloudinary.v2.config({
  cloud_name: "dlf6ksyse",
  api_key: "245892724739653",
  api_secret: "5-qhz2zY8d405k0-SVQiaygUkMQ",
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("chat message", (data) => {
    console.log("Message received:", data);
    io.emit("chat message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
