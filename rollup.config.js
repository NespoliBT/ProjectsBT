import svelte from "rollup-plugin-svelte";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import autoPreprocess from "svelte-preprocess";

export default [
  {
    input: ["app/backend/main.ts", "app/frontend/renderer.ts"],
    output: {
      dir: "public/build",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [
      nodeResolve({
        preferBuiltins: false,
      }),
      svelte({
        css: (css) => {
          css.write("index.css");
        },
        preprocess: autoPreprocess(),
      }),
      commonjs(),
      json(),
      typescript(),
    ],
    external: [
      "electron",
      "child_process",
      "fs",
      "path",
      "url",
      "module",
      "os",
      "express",
      "electron-updater",
      "better-sqlite3",
      "axios",
    ],
  },
];
