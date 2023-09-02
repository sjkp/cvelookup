import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    outDir: '../dist',    
    site: 'https://cvelookup.netlify.com',
    vite: {
        optimizeDeps: {
            exclude: ['advisory-database'],            
        }
    },
    integrations: [tailwind(), sitemap(), myIntegration()],
});

export function myIntegration() {
  return {
    name: 'myIntegration',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        
          // Use fileURLToPath to get a valid, cross-platform absolute path string
          console.log(dir)
          const outFile = fileURLToPath(new URL('./my-integration.json', dir));
        console.log(outFile);
      }
    }
  }
}
