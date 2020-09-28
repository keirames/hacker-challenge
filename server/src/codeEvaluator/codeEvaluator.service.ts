import { Injectable } from '@nestjs/common';
import { TaskResult } from './utils/task';
import createWorkerExecutor from './utils/workerExecutor';

type TestRunner = (
  testString: string,
  testTimeout: number,
  firstTest: boolean,
) => Promise<TaskResult>;

export type TestResult = {
  text: string;
  testString: string;
  pass: boolean;
  err: string;
  message: string;
  stack: string;
  log?: string;
};

@Injectable()
export class CodeEvaluatorService {
  private getTestRunner(code: string): TestRunner {
    const testWorker = createWorkerExecutor('testEvaluator', {
      terminateWorker: true,
    });

    return (
      testString: string,
      testTimeout: number,
      firstTest: boolean,
    ): Promise<TaskResult> => {
      return testWorker //
        .execute({ code, testString, firstTest }, testTimeout).done;
    };
  }

  private async executeTests(
    testRunner: TestRunner,
    tests: { text: string; testString: string }[],
    testTimeout = 5000,
  ): Promise<TestResult[]> {
    const testResults: TestResult[] = [];

    for (let i = 0; i < tests.length; i++) {
      const { text, testString } = tests[i];
      const newTest: TestResult = {
        text,
        testString,
        pass: false,
        err: '',
        message: '',
        stack: '',
      };
      // Only the first test output console.log to avoid overlap
      const firstTest = !!(i === 0);

      // To set log before push to testResult
      let globalLog = undefined;
      try {
        console.log(`execute testRunner ${i} times`);
        const { result, log } = await testRunner(
          testString,
          testTimeout,
          firstTest,
        );
        console.log(`end testRunner ${i} times`);

        globalLog = log;
        const { pass, err } = result;

        if (pass) newTest.pass = true;
        else throw err;
      } catch (err) {
        if (err.message === 'timeout') {
          newTest.err = 'Test timed out.';
          newTest.message = `${text} (${newTest.err})`;
        } else {
          // chai assertion error, this is success scenario
          // but we using throw code above
          const { message, stack } = err;
          newTest.err = message + '\n' + stack;
          newTest.stack = stack;
        }
        // todo: ouput error on console
      } finally {
        if (firstTest) newTest.log = globalLog;

        testResults.push(newTest);
      }
    }

    return testResults;
  }

  async executeChallenge(
    code: string,
    tests: { text: string; testString: string }[],
  ): Promise<TestResult[]> {
    const testRunner = this.getTestRunner(code);
    return this.executeTests(testRunner, tests, 1000);
  }
}
