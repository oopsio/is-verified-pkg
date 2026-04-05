import pc from "picocolors";
import { isVerified } from "../dist/index.mjs";

async function run() {
  const pkg = "esbuild";
  const iterations = 5;

  console.log(pc.bold(pc.magenta("\n  Performance Benchmark")));
  console.log(pc.dim("  Target: https://registry.npmjs.org\n"));

  const startSeq = performance.now();
  for (let i = 0; i < iterations; i++) {
    await isVerified(pkg);
  }
  const endSeq = performance.now();
  const seqOps = (iterations / ((endSeq - startSeq) / 1000)).toFixed(2);

  console.log(`  ${pc.red("×")} ${pc.bold("Sequential")} ${pc.dim(seqOps + " ops/s")}`);

  const startPar = performance.now();
  await Promise.all(Array.from({ length: iterations }).map(() => isVerified(pkg)));
  const endPar = performance.now();
  const parOps = (iterations / ((endPar - startPar) / 1000)).toFixed(2);

  console.log(`  ${pc.green("√")} ${pc.bold("Parallel  ")} ${pc.dim(parOps + " ops/s")}\n`);

  console.log(pc.dim("  (Sequential is limited by network round-trips)"));
  console.log(pc.dim("  (Parallel leverages concurrent fetch requests)\n"));
}

run();
