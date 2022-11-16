import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    external: [],
    noExternal: [],
    format: ["esm", "cjs"],
    target: "es2022",
    skipNodeModulesBundle: true,
    clean: true,
    dts: true,
    esbuildPlugins: []
});