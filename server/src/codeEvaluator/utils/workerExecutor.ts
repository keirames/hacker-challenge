import { Worker } from 'worker_threads';
import { Task } from './task';

interface WorkerExecutorOptions {
  location?: '/js/';
  concurrency?: number;
  terminateWorker?: boolean;
}

class WorkerExecutor {
  private workerName: string;
  private workers: Worker[];
  private location: string;
  private concurrency: number;
  private terminateWorker: boolean;
  private queue: Task[];
  private running: number;

  constructor(workerName: string, options: WorkerExecutorOptions) {
    // default options
    const {
      location = './src/codeEvaluator/utils/',
      concurrency = 1,
      terminateWorker = false,
    } = options;

    this.workerName = workerName;
    this.workers = [];
    this.location = location;
    this.concurrency = concurrency;
    this.terminateWorker = terminateWorker;
    this.queue = [];
    this.running = 0;
    // getWorker will go through alot func so we need bind this
    this.getWorker = this.getWorker.bind(this);
  }

  // Reject if sthing wrong happen when create a worker
  private async getWorker(): Promise<Worker> {
    if (this.workers.length) {
      return this.workers.shift()!;
    } else {
      const workerFile =
        process.env.NODE_ENV === 'production'
          ? `${this.workerName}.js`
          : `${this.workerName}.import.js`;

      return new Promise<Worker>((resolve, reject) => {
        const worker = new Worker(`${this.location}${workerFile}`, {
          workerData: {
            path: `./${this.workerName}.ts`,
          },
        });

        worker.on('message', value => {
          if (value && value.type === 'contentLoaded') resolve(worker);
        });

        worker.on('error', err => {
          reject(err);
        });
      });
    }
  }

  private pushTask(task: Task): void {
    this.queue.push(task);
    this.next();
  }

  private handleTaskEnd(task: Task): () => void {
    return () => {
      this.running = this.running - 1;

      // If worker is not instantiate (worker throw err)
      if (task.worker) {
        const worker = task.worker;

        if (this.terminateWorker) {
          worker.terminate();
        } else {
          worker.removeAllListeners();
          this.workers.push(worker);
        }
      }

      this.next();
    };
  }

  private next(): void {
    while (this.running < this.concurrency && !!this.queue.length) {
      const task = this.queue.shift()!;
      const handleTaskEnd = this.handleTaskEnd(task);
      task
        .execute(this.getWorker)
        .done //
        .then(handleTaskEnd)
        .catch(handleTaskEnd);
      this.running = this.running + 1;
    }
  }

  execute(
    data: { code: string; testString: string; firstTest: boolean },
    timeout = 1000,
  ): Task {
    const task = new Task(data, timeout);
    this.pushTask(task);
    return task;
  }
}

export default function createWorkerExecutor(
  workerName: string,
  options: WorkerExecutorOptions,
): WorkerExecutor {
  return new WorkerExecutor(workerName, options);
}
