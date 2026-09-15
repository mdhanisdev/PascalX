import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";
// The public cloud name may be overridden by the deployment environment.
const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "fsaktlwi";

const securityHeaders = [
  { key: "Content-Security-Policy", value: `default-src 'self'; base-uri 'self'; connect-src 'self'; font-src 'self' data:; form-action 'self'; frame-ancestors 'none'; img-src 'self' data: blob:${cloudinaryCloudName ? " https://res.cloudinary.com" : ""}; media-src 'self'${cloudinaryCloudName ? " https://res.cloudinary.com" : ""}; object-src 'none'; script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""}; style-src 'self' 'unsafe-inline'; upgrade-insecure-requests` },
  { key: "Permissions-Policy", value: "camera=(), geolocation=(), microphone=(), payment=(), usb=()" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  ...(cloudinaryCloudName
    ? {
        images: {
          remotePatterns: [
            {
              protocol: "https",
              hostname: "res.cloudinary.com",
              pathname: `/${cloudinaryCloudName}/**`,
            },
          ],
        },
      }
    : {}),
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
