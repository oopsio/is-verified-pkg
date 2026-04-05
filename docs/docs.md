---
layout: page
title: API Documentation
permalink: /docs/
---

# API Reference

## isVerified(name, [version])

Queries the npm registry to check for verifiable provenance metadata.

### Parameters
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | The package name (e.g., `zod`). |
| `version` | `string` | Optional. Defaults to `latest`. |

### Returns
`Promise<boolean>`: Returns `true` if `trustedPublisher` or `sigstore.bundle` is found.

### Example CLI Verification
```bash
npx is-verified-pkg lodash 4.17.21
```