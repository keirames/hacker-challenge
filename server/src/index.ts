import { connect } from "mongoose";
import express from "express";
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const schema = require("./graphql/schema");

const app = express();

app.use(cors({ origin: "*" }));
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

connect("mongodb://localhost:27017/hacker-challenge", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to mongoDB..."))
  .catch((err: { message: any }) =>
    console.log(
      `Cannot connected to mongoDB with err : ${err.message}`
    )
  );

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
