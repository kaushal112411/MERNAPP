import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postroutes from "./routes/posts";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postroutes);
app.get("/", (req, res) => {
  res.send("hello to memories api");
});

const CONNECTION_URL =
  "mongodb+srv://unsorted_array:112411Sp@cluster0.yacbp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3000;
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log("server running on", PORT);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  server.close(() => {
    console.log("Process terminated");
  });
});
