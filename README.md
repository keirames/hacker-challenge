# Hacker Challenge
- Hacker Challenge is a web application which allows user to solve algorithm.
- In server site we are using Nodejs with Express, which know as most popular library for combine with Nodejs.
- In client site we are using React.

# About server site with Nodejs
- We currently add these technologies (may be change in the future):
  - Expressjs
  - Graphql
  - TypeScript
  - Mongoose
  - Lodash
- APIs:
  - User: 
    - getUser(id: ID!): User
    - getUsers(): [User!]!
    - addUser(user: { username, password, firstname, lastname } ): User!
    - editUser(userId: ID!, user: { firstname, lastname } ): User!
  - Challenge:
    - getChallenge(id: ID!): Challenge
    - getChallenges(): [Challenge!]!
    - addOrRemoveSolvedChallenges(userId: ID!, challengeId: ID!): [ID!]
    - addOrRemoveLikedChallenges(userId: ID!, challengeId: ID!): [ID!]
  
