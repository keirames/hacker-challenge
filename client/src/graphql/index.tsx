export interface User {
  id: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  solvedChallenges: Challenge[];
  likedChallenges: Challenge[];
  totalPointes: number;
}

export interface Contest {
  id: string;
  name: string;
  challenges: Challenge[];
}

export interface TestCase {
  text: string;
  testString: string;
}

export interface Challenge {
  id: string;
  title: string;
  content: string;
  level: string;
  points: number;
  contest: Contest;
  testCases: TestCase[];
  testInputs: String[];
  challengeSeed: String;
  passedUser: User[];
}
