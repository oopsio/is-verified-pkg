/**
 * Checks if an npm package version was published via a Trusted Publisher (OIDC/Provenance).
 * * @param name - The package name (e.g., 'esbuild' or '@scope/pkg')
 * @param version - The version string (defaults to 'latest')
 * @returns A promise that resolves to true if the package has verifiable provenance.
 */
export declare function isVerified(name: string, version?: string): Promise<boolean>;
