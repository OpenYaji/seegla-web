import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root. Two package-lock.json files exist (one here, one
  // in the user home), and Next.js otherwise guesses the wrong root, which
  // produces a startup warning and can confuse path resolution.
  turbopack: {
    root: path.resolve(__dirname),
  },

  images: {
    // Any local file in public/ can be optimised, with or without a query
    // string. The marketing images carry a `?v=<mtime>` cache-busting token so
    // a changed file shows without a hard refresh, and Next.js needs local
    // image URLs that use a query string to be whitelisted here.
    //
    // Omitting `search` means the query string is not matched at all, which
    // is what allows `?v=...` to work. Listing `search: "?v=*"` does not:
    // Next compares the search string literally, so that pattern only ever
    // matches a URL whose query is exactly "?v=*".
    //
    // The pathname is `/**` rather than `/marketing/**` on purpose. Restricting
    // it to the marketing folder silently broke every other public image: the
    // navigation logo, the footer logo, and the logo on the legal pages all
    // returned 400 from the image optimiser.
    localPatterns: [{ pathname: "/**" }],
  },
};

export default nextConfig;
