import { ApolloServer } from "apollo-server-express";
import resolvers from "../resolvers";
import typeDefs from "../graphql/schema";

const constructTestServer = ({ context }: { context: Function }) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // dataSources
    context,
  });

  return { server };
};

export default constructTestServer;
