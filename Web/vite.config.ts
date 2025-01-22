import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(), 
    viteTsconfigPaths(),
    svgrPlugin()
  ],
  server: {
    port: 80,
    open: true // this will open directly to your browser
  },
  build: {
    outDir: "build",
  }
});