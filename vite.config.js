/**
 * @type {import('vite').UserConfig}
 */
const config = {
  build: {
    target: "esnext",
    brotliSize: false,
    chunkSizeWarningLimit: 2_000,
  },
};

export default config;
