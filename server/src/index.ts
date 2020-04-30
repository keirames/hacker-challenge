import express from "express";
const cors = require("cors");
import { Server } from "http";
import { typeDefs } from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import mongooseServer from "./db";
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import { verify } from "jsonwebtoken";
import { User } from "./models/user";

const apolloServer: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    return { req };
  },
});

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

// const sum: string = `return function sum(a,b){return a + b}`;

// const func = new Function(sum);

// if (func()(1, 2) === 3) console.log("true");

// const executeCode = () => {
//   func();
// };

export { server };
