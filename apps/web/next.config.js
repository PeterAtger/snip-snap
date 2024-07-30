/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import NextBundleAnalyzer from '@next/bundle-analyzer';

await import('./src/env.mjs');

/** @type {import('next').NextConfig} */
const nextConfig = {};

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
