import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
	root: path.resolve(__dirname, '.'),
	plugins: [react(), svgr()],
	server: {
		port: 3333,
		proxy: {
			'/api': 'http://localhost:3001',
		},
	},
	resolve: {
		alias: {
			'@shared': path.resolve(__dirname, '../shared'),
			'@src': path.resolve(__dirname, 'src'),
		},
	},
});
