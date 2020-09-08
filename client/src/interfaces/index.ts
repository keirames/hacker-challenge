import { User } from '../graphql';

interface UserTokenDecode {
  exp: number;
  firstName: string;
  iat: number;
  lastName: string;
  sub: number;
  totalPoints: number;
}

interface GetMeDataWithClient extends User {
  userTokenDecode: UserTokenDecode;
}

export interface GetMeData {
  getMe: GetMeDataWithClient;
}
