A professional README for a security utility should be concise, technical, and focused on implementation. Here is a `README.md` tailored for your v1.0.0 release.

-----

# is-verified-pkg

**Lightweight utility to verify if an npm package was published via a Trusted Publisher (OIDC/Provenance).**

[](https://www.google.com/search?q=https://www.npmjs.com/package/is-verified-pkg)
[](https://www.google.com/search?q=https://github.com/youruser/is-verified-pkg/blob/main/LICENSE)

## Overview

`is-verified-pkg` provides a programmatic and command-line interface to check for **Sigstore attestations** and **OIDC Provenance** on npm packages. This allows developers to verify that a package was built and published from a trusted CI/CD environment (like GitHub Actions) rather than a local machine.

## Features

  * **Zero Dependencies**: Uses native `fetch` and `AbortController`.
  * **Dual-Stack**: Full support for ESM (`.mjs`) and CommonJS (`.cjs`).
  * **Optimized**: Sub-1KB footprint with mangled internal logic.
  * **CLI Included**: Colorized terminal output with appropriate exit codes for CI/CD.
  * **Type Safe**: Includes minified `.d.mts` and `.d.cts` definitions.

## Installation

```bash
npm install is-verified-pkg
```

## CLI Usage

The CLI is designed for integration into build pipelines. It returns exit code `0` if verified and `1` if unverified or an error occurs.

```bash
# Check latest version
npx is-verified-pkg <package-name>

# Check specific version
npx is-verified-pkg <package-name> <version>
```

## Library Usage

### ESM (Modern)

```javascript
import { isVerified } from 'is-verified-pkg';

const ok = await isVerified('esbuild');
if (ok) {
  console.log('Package is verified via OIDC');
}
```

### CommonJS (Legacy)

```javascript
const { isVerified } = require('is-verified-pkg');

isVerified('zod', '3.22.0').then(verified => {
  if (verified) console.log('Secure provenance found');
});
```

## API Reference

### `isVerified(name, version?)`

  * **`name`** `<string>`: The npm package name (e.g., `react` or `@scope/pkg`).
  * **`version`** `<string>`: The version to check. Defaults to `latest`.
  * **Returns**: `Promise<boolean>` — `true` if the package contains `trustedPublisher` metadata or a `sigstore.bundle` attestation.

## Technical Details

The utility queries the npm registry metadata for the specified version and validates three primary fields:

1.  `pkg.trustedPublisher`: Direct OIDC link.
2.  `pkg.dist.attestations`: Presence of a Sigstore bundle.
3.  `pkg._npmUser.trustedPublisher`: User-level publisher trust.

## Development

```bash
bun install    # Install devDependencies
bun run build  # Generate dist/ artifacts
bun run test   # Run test suite
```

## License

MIT