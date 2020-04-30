// "use strict";

// const fs = require("fs");

// // Begin reading from stdin so the process does not exit. (basically reading from the command line)
// process.stdin.resume();

// //set the enconding for received data to ascii so it will be readable
// process.stdin.setEncoding("utf-8");

// //declare variables to process the data
// let inputString: any = "";
// let currentLine = 0;

// //if data is coming through, put it in the input_stdin string. keep receiving data until no more comes through
// process.stdin.on("data", function (inputStdin) {
//   inputString += inputStdin;
// });

// //after the transmission when the end signal is received
// // break the string up and push each new line (\n == new line) as an element into the array.
// process.stdin.on("end", function () {
//   inputString = inputString.split("\n");
//   main();
// });

// function readLine() {
//   return inputString[currentLine++];
// }

// // Complete the freqQuery function below.
// function freqQuery(queries: any) {
//   return queries;
// }

// function main() {
//   // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
//   const ws = fs.createWriteStream("text.txt");

//   const q = parseInt(readLine().trim(), 10);

//   let queries = Array(q);
//   console.log("\nQueries: ", queries.toString());

//   for (let i = 0; i < q; i++) {
//     queries[i] = readLine()
//       .replace(/\s+$/g, "")
//       .split(" ")
//       .map((queriesTemp: any) => parseInt(queriesTemp, 10));
//   }

//   const ans: any = freqQuery(queries);

//   ws.write(ans.join("\n") + "\n");

//   ws.end();
// }

const code = `"use strict";

const fs = require("fs");

// Number of cloud ---> 7
// Array of cloud  ---> 0 0 1 0 0 1 0
// Answer          ---> 4

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString: any = "";
let currentLine = 0;

process.stdin.on("data", (inputStdin) => {
  inputString += inputStdin;
});

process.stdin.on("end", (_: any) => {
  inputString = inputString
    .replace(/\s*$/, "")
    .split("\\n")
    .map((str: string) => str.replace(/\s*$/, ""));
  main();
});

function readLine() {
  return inputString[currentLine++];
}

// Complete the jumpingOnClouds function below.
function jumpingOnClouds(c: any) {
  return 4;
}

function main() {
  const ws = fs.createWriteStream("text.txt");

  const n = parseInt(readLine(), 10);

  const c = readLine()
    .split(" ")
    .map((cTemp: any) => parseInt(cTemp, 10));

  let result = jumpingOnClouds(c);

  ws.write(result + "\\n");

  ws.end();
}`;

export { code };
