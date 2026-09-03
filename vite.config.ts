import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const localBackend = 'http://localhost:5000';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiProxyTarget = env.VITE_DEV_API_PROXY?.trim() || localBackend;

  return {
    plugins: [react()],
    server: {
      port: 3000,
      strictPort: true,
      proxy: {
        '/api': {
          target: apiProxyTarget,
          changeOrigin: true,
          secure: false,
          configure: (proxy) => {
            proxy.on('proxyRes', (proxyRes) => {
              const cookies = proxyRes.headers['set-cookie'];
              if (!cookies) return;
              proxyRes.headers['set-cookie'] = cookies.map((cookie) =>
                cookie.replace(/;\s*Secure/gi, '').replace(/;\s*Domain=[^;]+/gi, '')
              );
            });
          }
        },
        '/uploads': {
          target: apiProxyTarget,
          changeOrigin: true,
          secure: false
        }
      }
    }
  };
});
