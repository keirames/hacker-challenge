import { verify } from "jsonwebtoken";
import { User } from "../models/user";
import { AuthenticationError } from "apollo-server-express";

const authenticateUser = async (context: any) => {
  const token = context.req.headers.authorization || "";

  //! Refactor privatekey into ENV
  try {
    const decodedUser: any = verify(token, "helloworld");

    const user = await User.findById(decodedUser._id, "-password");
    if (!user) throw new AuthenticationError("Invalid token");

    return user;
  } catch (error) {
    throw new AuthenticationError("Invalid token");
  }
};

export { authenticateUser };
