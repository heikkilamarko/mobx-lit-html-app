import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		chunkSizeWarningLimit: 2048
	},
	css: {
		preprocessorOptions: {
			scss: {
				quietDeps: true,
				silenceDeprecations: ['import', 'legacy-js-api']
			}
		}
	}
});
