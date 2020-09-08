import { assert } from 'chai';
import { Worker } from 'worker_threads';
import { resolve } from 'path';
import { createWriteStream, unlinkSync } from 'fs';

interface TestBuilder {
  testInputs: string[];
  testAssertions: string[];
  answer: string;
}

interface WorkerResult {
  value: string | number | Error;
  timeConsumed: number;
}

export interface TestedResult {
  passed: boolean;
  assert?: { message: string };
  time: number;
}

// interface ExecuteResult {
//   testedResults: TestedResult[];
//   error?: Error;
// }

export const executeSolution = async (
  userId: number,
  testBuilder: TestBuilder,
): Promise<TestedResult[] | Error> => {
  const { answer, testInputs, testAssertions } = testBuilder;

  const tempPath = resolve(__dirname, '../temp');
  const strictFileId = `${tempPath}/user-${userId}-${new Date().getTime()}-solution.js`;

  const tempJSFile = createWriteStream(strictFileId, {
    flags: 'w',
    encoding: 'utf8',
  });
  tempJSFile.on('open', () => {
    tempJSFile.write(answer, err => {
      if (err) return err;
    });
    tempJSFile.end();
  });

  //   const results: ExecuteResult[] = await Promise.all(
  //     testInputs.map(
  //       (testInput: string) =>
  //         new Promise((resolve, reject) => {
  //           const timeStart = new Date().getTime();

  //           const worker = new Worker(strictFileId, { stdin: true });

  //           const workerWriter = worker.stdin;

  //           workerWriter?.write(testInput, 'utf8');

  //           workerWriter?.end();

  //           worker.on('message', (value: string | number) => {
  //             const timeConsumed = new Date().getTime() - timeStart;
  //             return resolve({ value, timeConsumed });
  //           });
  //           worker.on('error', reject);
  //           worker.on('exit', code => {
  //             if (code !== 0) {
  //               resolve({
  //                 value: new Error('Compiler has terminated'),
  //                 timeConsumed: 0,
  //               });
  //             }
  //           });
  //         }),
  //     ),
  try {
    const results: WorkerResult[] = await Promise.all(
      testInputs.map(
        async (testInput: string): Promise<WorkerResult> => {
          const timeStart = new Date().getTime();

          const worker = new Worker(strictFileId, { stdin: true });

          const workerWriter = worker.stdin;
          if (!workerWriter)
            return {
              value: new Error('Compiler has terminated'),
              timeConsumed: 0,
            };

          workerWriter.write(testInput, 'utf8');

          workerWriter.end();

          worker.on('message', (value: string | number) => {
            const timeConsumed = new Date().getTime() - timeStart;
            return { value, timeConsumed };
          });
          worker.on('error', err => ({
            value: new Error('Compiler has terminated'),
            timeConsumed: 0,
          }));
          worker.on('exit', code => {
            if (code !== 0) {
              return {
                value: new Error('Compiler has terminated'),
                timeConsumed: 0,
              };
            }
          });

          return {
            value: new Error('Compiler has terminated'),
            timeConsumed: 0,
          };
        },
      ),
    );

    const testedResults: TestedResult[] = results.map((result, index) => {
      const args = ['assert', 'result'];

      const test = new Function(...args, `return ${testAssertions[index]}`);

      // If the worker exit
      if (
        result.value instanceof Error &&
        result.value.stack &&
        result.value.message
      ) {
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

    return testedResults;
  } catch (error) {
    // Graphql auto set "data": null if there is error
    // return { error, testedResults: [] };
    return error;
  }
};
