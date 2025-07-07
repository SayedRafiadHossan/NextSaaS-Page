import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import injectHTML from "vite-plugin-html-inject";

const getHtmlEntries = () => {
  const pagesDir = path.resolve(__dirname, "");
  const entries = {};
  const files = fs.readdirSync(pagesDir);
  const htmlFiles = files.filter((file) => file.endsWith(".html"));
  htmlFiles.forEach((file) => {
    const name = path.basename(file, ".html");
    entries[name] = path.resolve(pagesDir, file);
  });

  return entries;
};

export default defineConfig({
  plugins: [
    tailwindcss(),
    injectHTML({
      tagName: "Component",
    }),
  ],
  build: {
    rollupOptions: {
      input: getHtmlEntries(),
    },
  },
});
