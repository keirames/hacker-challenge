import userResolvers from "./userResolvers";
import challengeResolvers from "./challengeResolvers";
import contestResolvers from "./contestResolvers";

const resolvers = {
  Query: {
    ...challengeResolvers.Query,
    ...userResolvers.Query,
    ...contestResolvers.Query,
  },
  User: userResolvers.User,
  Challenge: challengeResolvers.Challenge,
  Contest: contestResolvers.Contest,
  Mutation: {
    ...userResolvers.Mutation,
    ...challengeResolvers.Mutation,
    ...contestResolvers.Mutation,
  },
};

export default resolvers;
