import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "../graphql/schema";
import resolvers from "../graphql/resolvers";

const constructTestServer = ({ context }: { context: Function }) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // dataSources
    context,
  });

  return { server };
};

export { constructTestServer };
