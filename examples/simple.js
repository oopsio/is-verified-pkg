import pc from "picocolors";
import { isVerified } from "../dist/index.mjs";

async function run() {
  const pkgs = ["esbuild", "lodash"];

  for (const name of pkgs) {
    const ok = await isVerified(name);
    const status = ok ? pc.green("verified") : pc.yellow("unverified");
    const symbol = ok ? pc.green("√") : pc.red("×");

    console.log(`${symbol} ${pc.bold(name.padEnd(10))} ${status}`);
  }
}

run();
