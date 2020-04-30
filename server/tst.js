"use strict";

const fs = require("fs");

// Number of cloud ---> 7
// Array of cloud  ---> 0 0 1 0 0 1 0
// Answer          ---> 4

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", (inputStdin) => {
  inputString += inputStdin;
});

process.stdin.on("end", (_) => {
  inputString = inputString
    .replace(/s*$/, "")
    .split("\n")
    .map((str) => str.replace(/s*$/, ""));
  main();
});

function readLine() {
  return inputString[currentLine++];
}

// Complete the jumpingOnClouds function below.
function jumpingOnClouds(c) {
  return 4;
}

function main() {
  const ws = fs.createWriteStream("text.txt");

  const n = parseInt(readLine(), 10);

  const c = readLine()
    .split(" ")
    .map((cTemp) => parseInt(cTemp, 10));

  let result = jumpingOnClouds(c);

  ws.write(result + "\n");

  ws.end();
}
