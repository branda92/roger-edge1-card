import { defineConfig } from "vite";
import { readFileSync, readdirSync } from "node:fs";

const license = readFileSync(new URL("./LICENSE", import.meta.url), "utf8");
const { version } = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));
const notices = readFileSync(new URL("./THIRD_PARTY_NOTICES.md", import.meta.url), "utf8");
const licensesDir = new URL("./licenses/", import.meta.url);
const dependencyLicenses = readdirSync(licensesDir).sort().map(name =>
  `${name}\n${readFileSync(new URL(name, licensesDir), "utf8")}`
).join("\n\n");

export default defineConfig({
  build: {
    target: "es2020",
    lib: {
      entry: "src/roger-edge1-card.ts",
      formats: ["es"],
      fileName: () => "roger-edge1-card.js",
    },
    outDir: "dist",
    rollupOptions: { output: { banner: `/*! Roger EDGE1 Card ${version}\n${license}\n${notices}\n${dependencyLicenses}\n*/` } },
    emptyOutDir: true,
  },
});
