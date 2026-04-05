import * as esbuild from "esbuild";
import pc from "picocolors";
import { readFileSync, writeFileSync } from "node:fs";

/**
 * Super-lightweight .d.ts minifier
 * Removes JSDoc, internal comments, and collapses whitespace.
 */
function minifyTypes(content) {
  return content
    .replace(/\/\*\*[\s\S]*?\*\//g, "") // Remove JSDoc
    .replace(/\/\/.*/g, "") // Remove inline comments
    .replace(/\s+/g, " ") // Collapse whitespace
    .trim();
}

async function runBuild() {
  const entry = "index.js";
  const cliEntry = "cli.js";
  const typeEntry = "index.d.ts";

  const minifyConfig = {
    bundle: true,
    minify: true,
    treeShaking: true,
    legalComments: "none",
  };

  console.log(pc.cyan(pc.bold("\nStarting build...")));

  try {
    // 1. CommonJS Library Build
    await esbuild.build({
      ...minifyConfig,
      entryPoints: [entry],
      outfile: "dist/index.cjs",
      format: "cjs",
      platform: "node",
      target: "node18",
    });
    console.log(`  ${pc.green("√")} ${pc.dim("CommonJS library built")} (dist/index.cjs)`);

    // 2. ESM Library Build
    await esbuild.build({
      ...minifyConfig,
      entryPoints: [entry],
      outfile: "dist/index.mjs",
      format: "esm",
      platform: "neutral",
      target: "es2022",
    });
    console.log(`  ${pc.green("√")} ${pc.dim("ESM library built")}      (dist/index.mjs)`);

    // 3. Bundled ESM CLI Build
    await esbuild.build({
      ...minifyConfig,
      entryPoints: [cliEntry],
      outfile: "dist/cli.mjs",
      format: "esm",
      platform: "node",
      target: "node18",
      banner: {
        js: "#!/usr/bin/env node",
      },
    });
    console.log(`  ${pc.green("√")} ${pc.dim("CLI bundled (ESM)")}     (dist/cli.mjs)`);

    // 4. Minified Type Definitions
    try {
      const types = readFileSync(typeEntry, "utf8");
      const minifiedTypes = minifyTypes(types);

      writeFileSync("dist/index.d.mts", minifiedTypes);
      writeFileSync("dist/index.d.cts", minifiedTypes);

      console.log(`  ${pc.green("√")} ${pc.dim("Types minified")}          (dist/*.d.ts)`);
    } catch {
      console.log(`  ${pc.yellow("!")} ${pc.dim("Skipping types (index.d.ts not found)")}`);
    }

    console.log(pc.bold(pc.green("\nBuild complete successfully!\n")));
  } catch (err) {
    console.error(pc.red(pc.bold("\nBuild failed!")));
    console.error(pc.red(err.message));
    process.exit(1);
  }
}

runBuild();
