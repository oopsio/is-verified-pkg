/**
 * Checks if an npm package version was published via a Trusted Publisher (OIDC/Provenance).
 * * @param {string} name - The package name (e.g., 'esbuild' or '@scope/pkg')
 * @param {string} version - The version string (defaults to 'latest')
 * @returns {Promise<boolean>}
 */
export async function isVerified(name, version = "latest") {
  if (typeof name !== "string" || !name.trim() || name.length > 214) {
    return false;
  }

  const encodedName = name.includes("/")
    ? `@${encodeURIComponent(name.slice(1))}`
    : encodeURIComponent(name);

  const url = `https://registry.npmjs.org/${encodedName}/${version}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });

    clearTimeout(timeout);

    if (!res.ok) return false;

    const pkg = await res.json();

    if (!pkg || typeof pkg !== "object") return false;
    const hasTrustedPublisher = !!pkg.trustedPublisher;
    const hasAttestations = !!(pkg.dist?.attestations || pkg.dist?.["sigstore.bundle"]);
    const hasUserTrust = !!pkg._npmUser?.trustedPublisher;

    return hasTrustedPublisher || hasAttestations || hasUserTrust;
  } catch {
    return false;
  }
}
