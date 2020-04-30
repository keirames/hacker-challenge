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
    const results = await Promise.all(
      testInputs.map(
        (testInput: string) =>
          new Promise((resolve, reject) => {
            const worker = new Worker(strictFileId, { stdin: true });

            const workerWriter = worker.stdin;
            workerWriter?.write(testInput, "utf8");
            workerWriter?.end();

            worker.on("message", resolve);
            worker.on("error", reject);
            worker.on("exit", (code) => {
              if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
            });
          })
      )
    );

    const testedResults = results.map((result, index) => {
      const args = ["assert", "result"];
      const test = new Function(...args, `return ${testStrings[index]}`);
      try {
        test(assert, result);
        return { passed: true };
      } catch (error) {
        const { message, actual, expected } = error;
        return { passed: false, assert: { message, actual, expected } };
      }
    });

    // Delete tempJSFile
    unlinkSync(strictFileId);

    return { testedResults };
  } catch (error) {
    // Graphql auto set "data": null if there is error
    // return { error, testedResults: [] };
    return { error };
  }
};

export default executeSolution;
