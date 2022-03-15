import pkg from "./package.json";
import resolve from "rollup-plugin-node-resolve";
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
export default {
  input: "./src/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    json(),
  ]
};