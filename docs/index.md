---
layout: home
title: Home
---

# is-verified-pkg

**Verify npm package provenance and Sigstore attestations with zero dependencies.**

`is-verified-pkg` is a sub-1KB utility designed for security-conscious developers. It identifies if a package version was published via a **Trusted Publisher** (OIDC) rather than a manual upload.

### Key Features
* **Zero Dependencies**: Powered by native `fetch`.
* **Dual-Stack**: Supports ESM and CommonJS.
* **CLI Built-in**: Ready for CI/CD pipelines.
* **Ultra-Fast**: Optimized for minimal execution overhead.

---

## Quick Start

### Installation
```bash
npm install is-verified-pkg
```

### Basic Usage

```javascript
import { isVerified } from 'is-verified-pkg';

const ok = await isVerified('esbuild');
if (ok) console.log('Package is verified');
```

-----

[View the API Documentation](/docs)