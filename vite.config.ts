/* eslint-disable import/no-extraneous-dependencies */
import * as path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: "build",
	},
	plugins: [react()],
	resolve: {
		alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
	},
});
