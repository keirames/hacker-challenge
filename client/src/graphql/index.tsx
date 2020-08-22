export interface User {
  id: number;
  firstName: string;
  lastName: string;
  totalPoints: number;
  solvedChallenges: SolvedChallenge[];
  likedChallenges: Challenge[];
  userAccount: UserAccount | null;
  userExternalLogins: UserExternalLogin[];
  subscriptionPlans: Subscription[];
}

export interface SolvedChallenge {
  challenge: Challenge;
  createdAt: string;
}

export interface UserAccount {
  id: number;
  email: string;
  registrationTime: string;
  emailConfirmationToken: string;
  passwordReminderToken: string;
  passwordReminderExpire: string;
}

export interface ExternalAuthenticationProvider {
  id: number;
  name: string;
}

export interface UserExternalLogin {
  id: number;
  externalUserId: number;
  email: string;
  firstName: string;
  lastName: string;
  externalAuthenticationProvider: ExternalAuthenticationProvider;
}

export interface Subscription {
  id: number;
  plan: Plan;
  startTime: string;
  endTime: string;
}

export interface Plan {
  id: number;
  name: string;
  pricePerMonth: number;
}

export interface Contest {
  id: number;
  name: string;
  slug: string;
  challenges: Challenge[];
}

export enum Level {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export interface Challenge {
  id: number;
  title: string;
  slug: string;
  problem: string;
  inputFormat: string;
  outputFormat: string;
  challengeSeed: string;
  testInputs: TestInput[];
  level: Level;
  points: number;
  testCases: TestCase[];
  contest: Contest;
  passedUsers: User[];
  likedUsers: User[];
  isSolved: boolean;
}

export interface TestInput {
  input: string;
}

export interface TestCase {
  id: number;
  text: string;
  testString: string;
}

//! actual & expected i think will better to be a string
interface TestedResultError {
  message: string;
  // actual: number;
  // expected: number;
}

export interface TestedResult {
  passed: boolean;
  time: number;
  assert: TestedResultError;
}

// export interface Answer {
//   testedResults: TestedResult[];
// }

export interface AuthData {
  client_id: string;
  code: string;
  redirect_uri: string;
}

export interface AccountDetails {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
