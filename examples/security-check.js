import pc from "picocolors";
import { isVerified } from "../dist/index.mjs";

async function check(name) {
  const verified = await isVerified(name);

  if (verified) {
    console.log(`${pc.cyan("ℹ")} ${pc.bold(name)} status ${pc.green("trusted")}`);
  } else {
    console.log(`${pc.red("!!")} ${pc.bold(name)} status ${pc.red("untrusted")}`);
    console.log(`${pc.red("!!")} manual audit required`);
    process.exit(1);
  }
}

check("zod");
