import { defineConfig } from 'astro/config';

// Custom-Domain über GitHub Pages: `site` ist deine echte Domain.
// Falls deine Domain nicht marquart.dev ist, hier UND in public/CNAME anpassen.
export default defineConfig({
  site: 'https://marquart.dev',
  image: {
    // Fuji-JPEGs sind schon auf 2048px – wir lassen Astro daraus WebP bauen.
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});
