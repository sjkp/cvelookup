import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    outDir: '../dist',    
    vite: {
        optimizeDeps: {
            exclude: ['advisory-database'],            
        }
    },
    integrations: [tailwind()],
});


function fixExternal() {
    return {
      name: 'fix-external',
      setup(build) {        
        const {external} = build.initialOptions;
        build.onResolve(
          { filter: /^[\w@][^:]/ },
          async ({ path: id, importer, kind, resolveDir }) => {
            console.log(external);
            if (external && external.includes(id)) {
              return {
                path: id,
                external: true,
              };
            }
          }
        );
      },
    };
  }