import { connect } from "mongoose";
import express from "express";
const cors = require("cors");
import { Server } from "http";
const { ApolloServer, gql } = require("apollo-server-express");
import { typeDefs } from "./graphql/schema";
import resolvers from "./graphql/resolvers";

const apolloServer = new ApolloServer({ typeDefs, resolvers });

const app = express();
app.use(cors({ origin: "*" }));

apolloServer.applyMiddleware({
  app,
  // cors: {
  //   credentials: true,
  //   origin: "http://localhost:3001",
  // },
});

const mongooseServer = connect("mongodb://localhost:27017/hacker-challenge", {
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

export { server, mongooseServer };
