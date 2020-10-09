import { parentPort } from 'worker_threads';
import { assert as chaiAssert } from 'chai';
import { TestEvaluatorEventType } from './task';
import { format } from './format';

if (parentPort === null) {
  throw new Error('parentPort is null, Worker is not create properly');
}

const utils = (() => {
  // Max string send/receive through WebSocket is 65536
  // in worker_threads we dont know but no one log that much.
  const MAX_LOGS_SIZE = 64 * 1024;

  // Declare [''] cause we turn off noImplicitAny in js form of
  // this file, It's cause ts error (: string[]) -> (: never[])
  // very weird and worker exit cause ts error.
  let logs: string[] = [''];
  logs = [];

  function flushLogs() {
    if (logs.length) {
      // We dont know why assert global not working in call below
      parentPort!.postMessage({
        type: 'log',
        data: logs.join('\n'),
      } as { type: TestEvaluatorEventType; data: string });
      logs = [];
    }
  }

  const oldLog = global.console.log.bind(global.console);
  function proxyLog(...args: unknown[]): void {
    logs.push(args.map((arg: unknown) => format(arg)).join(' '));

    if (logs.join('\n').length > MAX_LOGS_SIZE) {
      flushLogs();
    }

    oldLog(...args);
  }

  function toggleProxyLogger(on: boolean) {
    global.console.log = on ? proxyLog : oldLog;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function postResult(data: any) {
    flushLogs();
    // We dont know why assert global not working in call below
    parentPort!.postMessage(data);
  }

  return {
    toggleProxyLogger,
    flushLogs,
    postResult,
  };
})();

// Run the test if there is one.
// If not just evaluate the user code.
parentPort.on('message', async data => {
  // Any console.log code should be report, but only once
  utils.toggleProxyLogger(data.firstTest);

  // some 3rd lib func in code or testString
  const assert = chaiAssert;

  try {
    // eslint-disable-next-line prefer-const
    let userCodeWasExecuted = false;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const testResult = eval(`${data.code}
    utils.flushLogs();
    userCodeWasExecuted = true;
    utils.toggleProxyLogger(true);
    ${data.testString}`);

    // testCase is passed
    utils.postResult({ pass: true });
  } catch (err) {
    // Errors from testing shouldnt go to users.
    utils.toggleProxyLogger(false);

    utils.postResult({
      pass: false,
      err: {
        message: err.message,
        stack: err.stack,
      },
    });
  }
});

// Yell that worker created successfully.
parentPort.postMessage({ type: 'contentLoaded' });
