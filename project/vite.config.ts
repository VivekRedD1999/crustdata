import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: '0.0.0.0', // Allow access from external networks
    port: 5173, // Optional: Specify the port (default is 5173)
    strictPort: true, // Ensures Vite will fail if the port is already in use
  },
});
