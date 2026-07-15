import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Real, independent build pipeline for the design-system package's Design
// Preview app. Renders components from `components/` directly (no
// hand-copied CSS mockup) so the preview can never silently drift from the
// actual source, per the "replace preview.html" requirement.
export default defineConfig({
  root: path.resolve(dirname, "preview-app"),
  plugins: [react()],
  resolve: {
    alias: {
      "@ds": dirname,
    },
  },
  build: {
    outDir: path.resolve(dirname, "preview-app/dist"),
    emptyOutDir: true,
  },
  server: {
    port: 4300,
  },
});
