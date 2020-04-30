import { connect } from "mongoose";

const connectionString: string = `mongodb://localhost:27017/${
  process.env.NODE_ENV === "test" ? "hacker-challenge-test" : "hacker-challenge"
}`;
const mongooseServer = () => {
  connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
    .then(() => console.log(`Connected to ${connectionString}`))
    .catch((err: { message: any }) =>
      console.log(`Cannot connected to mongoDB with err : ${err.message}`)
    );
};

export default mongooseServer;
