import { Worker, isMainThread, parentPort, workerData } from "worker_threads";

// Get the numbers
const numbers = workerData;

const result = 1;

// return result
parentPort.postMessage(numbers);
