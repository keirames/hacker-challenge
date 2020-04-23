import express from "express";
const cors = require("cors");
import { Server } from "http";
const { ApolloServer, gql } = require("apollo-server-express");
import { typeDefs } from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import mongooseServer from "./db";

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

// Connect to mongoDB
mongooseServer();

const port = process.env.PORT || 3000;
const server: Server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

export { server };
