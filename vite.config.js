import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		chunkSizeWarningLimit: 2048
	}
});
