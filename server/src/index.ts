import { connect } from "mongoose";
import express from "express";
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
// const schema = require("./graphql/schema");
const { buildSchema } = require("graphql");
import { makeExecutableSchema } from "graphql-tools";
import { importSchema } from "graphql-import";
import resolvers from "./graphql/resolvers";
import { Server } from "http";
const path = require("path");

// Load GraphQL schema from files
const typeDefs = importSchema(path.join(__dirname, "./graphql/index.graphql"));

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
app.use(cors({ origin: "*" }));
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

connect("mongodb://localhost:27017/hacker-challenge", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to mongoDB..."))
  .catch((err: { message: any }) =>
    console.log(`Cannot connected to mongoDB with err : ${err.message}`)
  );

const port = process.env.PORT || 3000;
const server: Server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
