import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  base: command === "build"
    ? "/AR-Fruit-Game/"
    : "/"
}));