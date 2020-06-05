import os from "os";
import { assert } from "chai";
// const {
//   Worker,
//   isMainThread,
//   parentPort,
//   workerData,
// } = require("worker_threads");
import { Worker, isMainThread, parentPort, workerData } from "worker_threads";
import path from "path";
import { createWriteStream, unlinkSync } from "fs";

const tempPath = path.resolve("temp");

interface TestBuilder {
  testInputs: any;
  testStrings: any;
  answer: string;
}

const executeSolution = async (userId: string, testBuilder: TestBuilder) => {
  const { answer, testInputs, testStrings } = testBuilder;

  const strictFileId = `${tempPath}/user-${userId}-${new Date().getTime()}-solution.js`;

  const tempJSFile = createWriteStream(strictFileId, {
    flags: "w",
    encoding: "utf8",
  });
  tempJSFile.on("open", () => {
    tempJSFile.write(answer, (err) => {
      if (err) return err;
    });
    tempJSFile.end();
  });

  try {
    const results: {
      value: any;
      timeConsumed: any;
    }[] = await Promise.all(
      testInputs.map(
        (testInput: string) =>
          new Promise((resolve, reject) => {
            const timeStart = new Date().getTime();

            const worker = new Worker(strictFileId, { stdin: true });

            const workerWriter = worker.stdin;
            workerWriter?.write(testInput, "utf8");
            workerWriter?.end();

            worker.on("message", (value) => {
              const timeConsumed = new Date().getTime() - timeStart;
              return resolve({ value, timeConsumed });
            });
            worker.on("error", reject);
            worker.on("exit", (code) => {
              if (code !== 0)
                // resolve(new Error(`Compiler has terminated`));
                resolve({ value: new Error(`Compiler has terminated`) });
            });
          })
      )
    );

    const testedResults = results.map((result, index) => {
      const args = ["assert", "result"];
      const test = new Function(...args, `return ${testStrings[index]}`);

      // If the worker exit
      if (result.value.stack && result.value.message) {
        return {
          passed: false,
          assert: { message: result.value.message },
          time: 0,
        };
      }

      try {
        test(assert, result.value);
        return { passed: true, time: result.timeConsumed };
      } catch (error) {
        const { message, actual, expected } = error;
        return {
          passed: false,
          assert: { message, actual, expected },
          time: result.timeConsumed,
        };
      }
    });

    // Delete tempJSFile
    unlinkSync(strictFileId);

    return { testedResults };
  } catch (error) {
    // Graphql auto set "data": null if there is error
    // return { error, testedResults: [] };
    return { error: "Error" };
  }
};

export default executeSolution;
