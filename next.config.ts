import type { NextConfig } from "next";
import { existsSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";

/**
 * Last-resort guarantee that the Prisma Client exists before Next.js reads
 * a single route. `postinstall` and the `build` script's `prisma generate &&`
 * prefix (package.json) cover every platform that invokes this project via
 * `npm install` / `npm run build` -- but some hosting panels (observed:
 * Hostinger Business Hosting) run the `next` binary directly, or run
 * install with lifecycle scripts disabled, bypassing both of those.
 * `next.config.ts` is loaded on every invocation of `next` (build/dev/start)
 * no matter what wrapper called it, so this is the one hook that can't be
 * bypassed by an opaque deploy pipeline. It's a no-op (a single `existsSync`
 * stat call) whenever the client already exists, which is true on every
 * platform where postinstall/build already handled it.
 */
const generatedClientEntry = path.join(process.cwd(), "src", "generated", "prisma", "client.ts");
if (!existsSync(generatedClientEntry)) {
  execSync("npx prisma generate", { stdio: "inherit" });
}

const nextConfig: NextConfig = {
  output: "standalone",
};

export default nextConfig;
