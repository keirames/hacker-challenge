const mongoose = require("mongoose");
import express from "express";
const app = express();

app.use("/", (req, res) => {
  res.send("First created");
});

mongoose
  .connect("mongodb://localhost:27017/hacker-challenge", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongoDB..."))
  .catch((err: { message: any }) =>
    console.log(`Cannot connected to mongoDB with err : ${err.message}`)
  );

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
