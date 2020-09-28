import { Worker } from 'worker_threads';

type TaskEventType = 'done' | 'error';

export type TestEvaluatorEventType = 'log';

// type EventType = 'done' | 'error' | 'log';
type EventType = TaskEventType | TestEvaluatorEventType;

type EventHandler = (...arg: any) => void;

// todo: Try to type this data
type Event = (data: any) => void;

export type TaskResult = {
  result: {
    pass: boolean;
    err?: { message?: string; stack?: string };
  };
  log?: string;
};

export class Task {
  private events: {
    [key in TaskEventType]: EventHandler[];
  } &
    { [key in TestEvaluatorEventType]: EventHandler[] };
  private consoleProxy: string[];
  private _worker: Worker;
  private _done: Promise<TaskResult>;

  constructor(private data: any, private timeout: number) {
    // default values
    this.events = { done: [], error: [], log: [] };
    this.consoleProxy = [];
    this._done = new Promise((resolve, reject) => {
      this.on('log', this.proxyLogger)
        .once('done', data => resolve(data))
        .once('error', err => reject(err));
    });
  }

  get done(): Promise<TaskResult> {
    return this._done;
  }

  get worker(): Worker {
    return this._worker;
  }

  private proxyLogger(arg: string) {
    this.consoleProxy.push(arg);
  }

  on(eventType: EventType, eventHandler: EventHandler): Task {
    this.events[eventType].push(eventHandler);
    return this;
  }

  removeEventHandler(
    eventType: TaskEventType,
    eventHandler: EventHandler,
  ): Task {
    const index = this.events[eventType].indexOf(eventHandler);
    if (index !== -1) {
      this.events[eventType].splice(index, 1);
    }
    return this;
  }

  emit(eventType: EventType, ...args: any): Task {
    if (this.events[eventType].length > 0) {
      this.events[eventType].forEach((eventHandler: EventHandler) =>
        eventHandler.apply(this, args),
      );
    }
    return this;
  }

  once(eventType: TaskEventType, event: Event): Task {
    const eventHandler: EventHandler = (...args: any) => {
      this.removeEventHandler(eventType, eventHandler);
      event.apply(this, args);
    };

    this.on(eventType, eventHandler);

    return this;
  }

  execute(getWorker: () => Promise<Worker>): Task {
    getWorker()
      .then(worker => {
        this._worker = worker;

        const timeoutId = setTimeout(() => {
          this._worker.terminate();
          this.emit('error', { message: 'timeout' });
        }, this.timeout);

        worker.on('message', value => {
          if (value.type === 'log') {
            this.emit('log', value.data);
            return;
          }

          clearTimeout(timeoutId);
          // Transform resolved result, only on done event cause
          // chai assertion fail or pass all treat as successfull
          const result = {
            result: {
              pass: value.pass,
              err: value.err,
            },
            log: this.consoleProxy.join('\n'),
          };
          this.emit('done', result);
        });

        worker.on('error', err => {
          clearTimeout(timeoutId);
          this.emit('error', { message: err.message });
        });

        worker.postMessage(this.data);
      })
      .catch(err => this.emit('error', err));

    return this;
  }
}
