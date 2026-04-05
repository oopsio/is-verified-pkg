import pc from "picocolors";
import { isVerified } from "./dist/index.mjs";

const [pkgName, pkgVersion = "latest"] = process.argv.slice(2);

// 1. Help Menu
if (!pkgName || pkgName === "--help" || pkgName === "-h") {
  console.log(`
  ${pc.bold(pc.cyan("is-verified-pkg"))} ${pc.dim("v1.0.0")}
  Check if an npm package was published via OIDC provenance.

  ${pc.bold("Usage:")}
    npx is-verified-pkg <name> [version]
  `);
  process.exit(0);
}

// 2. Execution logic
async function main() {
  process.stdout.write(`  ${pc.dim("Checking")} ${pc.bold(pkgName)}... `);

  try {
    const verified = await isVerified(pkgName, pkgVersion);

    // Clear the "Checking..." line
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);

    if (verified) {
      console.log(`  ${pc.green("√")} ${pc.bold(pkgName)} is ${pc.green("verified")}`);
      process.exit(0);
    } else {
      console.log(`  ${pc.red("×")} ${pc.bold(pkgName)} has ${pc.red("no provenance")}`);
      process.exit(1);
    }
  } catch (err) {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    console.error(`  ${pc.red("×")} ${pc.yellow("Error:")} ${err.message}`);
    process.exit(1);
  }
}

main();
