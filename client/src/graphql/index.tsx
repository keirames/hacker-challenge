export interface User {
  id: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  solvedChallenges: Challenge[];
  likedChallenges: Challenge[];
  totalPointes: number;
  isPremium: boolean;
}

export interface Contest {
  id: string;
  name: string;
  slug: string;
  challenges: Challenge[];
}

export interface TestCase {
  text: string;
  testString: string;
}

export interface Content {
  problem: string;
  inputSample: string;
  outputSample: string;
}

export interface Challenge {
  id: string;
  title: string;
  slug: string;
  content: Content;
  level: string;
  points: number;
  contest: Contest;
  testCases: TestCase[];
  testInputs: string[];
  challengeSeed: string;
  passedUser: User[];
  isSolved: boolean;
}

//! actual & expected i think will better to be a string
interface TestedResultError {
  message: string;
  actual: number;
  expected: number;
}

export interface TestedResult {
  passed: boolean;
  time: number;
  assert: TestedResultError;
}

export interface Answer {
  testedResults: TestedResult[];
}
