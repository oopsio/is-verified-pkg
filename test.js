import pc from "picocolors";
import { isVerified } from "./dist/index.mjs";

async function runTests() {
  const cases = [
    { name: "esbuild", expected: true, desc: "Known provenance" },
    { name: "@actions/core", expected: true, desc: "Scoped with provenance" },
    { name: "lodash", expected: false, desc: "No provenance" },
    { name: "invalid-pkg-999", expected: false, desc: "404 handling" },
  ];

  console.log(pc.bold(pc.cyan("\n  is-verified-pkg v1.0.0")));
  console.log(pc.dim("  dist/index.mjs\n"));

  let passedCount = 0;
  const startTime = performance.now();

  for (const { name, expected, desc } of cases) {
    try {
      const result = await isVerified(name);
      const isOk = result === expected;

      if (isOk) {
        passedCount++;
        console.log(
          `  ${pc.green("√")} ${pc.dim(name.padEnd(25))} ${pc.blue("→")} ${pc.dim(desc)}`,
        );
      } else {
        console.log(
          `  ${pc.red("×")} ${pc.red(name.padEnd(25))} ${pc.red("| Expected " + expected + " but got " + result)}`,
        );
      }
    } catch (err) {
      console.log(`  ${pc.red("×")} ${pc.red(name)} ${pc.yellow("fail")} ${pc.dim(err.message)}`);
    }
  }

  const duration = (performance.now() - startTime).toFixed(2);

  console.log(pc.bold(`\n  Test Files  ${pc.green("1 passed")} (1)`));
  console.log(
    pc.bold(
      `       Tests  ${passedCount === cases.length ? pc.green(passedCount + " passed") : pc.red(passedCount + " passed")} (${cases.length})`,
    ),
  );
  console.log(pc.dim(`    Duration  ${duration}ms\n`));

  if (passedCount !== cases.length) process.exit(1);
}

runTests();
