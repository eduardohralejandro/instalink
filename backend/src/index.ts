import express from "express";
import http from "http";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Listening on port 8080");
});

const username = process.env.USERNAME;
const password = process.env.MONGO_PASSWORD;
const cluster = process.env.CLUSTER;

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority`
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});