import { verify } from "jsonwebtoken";
import { User } from "../models/users";
import { AuthenticationError } from "apollo-server-express";

const authenticateUser = async (context: any) => {
  let token: string = context.req.headers.authorization || "";

  // Split Bearer
  token = token.split(" ")[1];

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

export { authenticateUser };
