import { verify } from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-express";
import { User } from "../models/users";

const authenticateUser = async (context: any) => {
  let token: string = context.req.headers.authorization || "";

  // Split Bearer
  [, token] = token.split(" ");

  //! Refactor privatekey into ENV
  try {
    const decodedUser: any = verify(token, "helloworld");

    const user = await User.findById(decodedUser.id, "-password");
    if (!user) throw new AuthenticationError("Invalid token");

    return user;
  } catch (error) {
    throw new AuthenticationError("Invalid token");
  }
};

export default authenticateUser;
