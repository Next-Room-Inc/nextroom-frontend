export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@src": resolve(__dirname, "src/"),
    },
  },
  build: {
    outDir: "dist" // <-- make sure this is set
  }
});
