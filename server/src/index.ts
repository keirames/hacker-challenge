import express, { Request, Response } from "express";
import { Server } from "http";
import { typeDefs } from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import mongooseServer from "./db";
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import { sign } from "jsonwebtoken";
import { User } from "./models/users";
const cors = require("cors");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const apolloServer: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    return { req };
  },
});

const app = express();
app.use(cors({ origin: "*" }));

// Basic implement for passport, dont use but need declare
passport.serializeUser((user: any, cb: any) => cb(null, user));
passport.deserializeUser((user: any, cb: any) => cb(null, user));
passport.use(
  new GitHubStrategy(
    {
      clientID: "a7e8f0e875395eb2ab4d",
      clientSecret: "46d128febde2ef7001671ee344761fda3e213f52",
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) => {
      const { id, name, email } = profile._json;
      const token = await getTokenWithSocialStrategy("github", id, email, name);
      return done(null, { token });
    }
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: "1923633564440795",
      clientSecret: "646a1b488739f07ab927344921789a0a",
      callbackURL: "http://localhost:3000/auth/facebook/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) => {
      const { id, name, email } = profile._json;
      const token = await getTokenWithSocialStrategy(
        "facebook",
        id,
        email,
        name
      );
      return done(null, { token });
    }
  )
);
app.use(passport.initialize());
app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:3001/signIn",
  }),
  (req: Request, res: Response) => {
    /* This has a litle bit confuse cause no user pass in done()
    but this is how passport work */
    res.cookie("Authentication", (<any>req).user.token, { maxAge: 10000 });
    res.redirect("http://localhost:3001");
  }
);
app.get("/auth/facebook", passport.authenticate("facebook"));
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "http://localhost:3001/signIn",
  }),
  (req: Request, res: Response) => {
    /* This has a litle bit confuse cause no user pass in done()
    but this is how passport work */
    res.cookie("Authentication", (<any>req).user.token, { maxAge: 10000 });
    res.redirect("http://localhost:3001");
  }
);

const getTokenWithSocialStrategy = async (
  provider: "github" | "facebook" | "google",
  id: number,
  email: string | null,
  name: string
) => {
  const providerId = `${provider}Id`;
  let user: User | null = null;
  if (email) {
    user = await User.findOne({ email, [providerId]: id });
    if (user) {
      // Old user return user with email & oauthID
      // Do nothing
    } else {
      // Find user with oauthID
      user = await User.findOne({ [providerId]: id });
      if (user) {
        user = await User.findOne({ email });
        if (user) {
          // Email and oauth2 id is not at same place, refer the first used provider
          // return user with oauth2
          user = await User.findOne({ [providerId]: id });
        } else {
          // return user with oauth2
          user = await User.findOne({ [providerId]: id });
        }
      } else {
        user = await User.findOne({ email });
        if (user) {
          // Email already save with another strategy
          // Add oauthID to user
          (<any>user)[providerId] = id;
          await user.save();
        } else {
          // Create new user with email & oauthID
          await new User({
            email,
            [providerId]: id,
            firstname: name || "",
          }).save();
        }
        user = await User.findOneAndUpdate(
          { email },
          { firstname: name, [providerId]: id, email },
          { new: true, setDefaultsOnInsert: true }
        );
      }
    }
  } else {
    const result = await User.findOneAndUpdate(
      { [providerId]: id },
      { firstname: name, [providerId]: id, email },
      { rawResult: true, upsert: true, setDefaultsOnInsert: true }
    );
    user = result.value
      ? result.value
      : await User.findOne({ [providerId]: id });
  }

  if (user === null) throw new Error("Social strategy is broken");

  //! Refactor create token
  const token = sign(
    {
      id: user._id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      totalPoints: user.totalPoints,
      isPremium: user.isPremium,
    },
    "helloworld",
    {
      expiresIn: "2d",
    }
  );
  return token;
};

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
