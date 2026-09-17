/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async rewrites() {
    const taxOrigin = process.env.TAX_SERVICE_ORIGIN || "http://127.0.0.1:8000";
    const khasOrigin = process.env.KHAS_SERVICE_ORIGIN || "http://127.0.0.1:4001";
    const spesOrigin = process.env.SPES_ORIGIN || "http://127.0.0.1:5173";
    return [
      { source: "/api/tax-holiday/:path*", destination: `${taxOrigin}/api/tax-holiday/:path*` },
      { source: "/api/tax-allowance/:path*", destination: `${taxOrigin}/api/tax-allowance/:path*` },
      { source: "/api/tax-super-deduction/:path*", destination: `${taxOrigin}/api/tax-super-deduction/:path*` },
      { source: "/api/tax-bea-masuk/:path*", destination: `${taxOrigin}/api/tax-bea-masuk/:path*` },
      { source: "/api/khas/:path*", destination: `${khasOrigin}/api/khas/:path*` },
      { source: "/spes/:path*", destination: `${spesOrigin}/spes/:path*` },
    ];
  },
};

module.exports = nextConfig;
