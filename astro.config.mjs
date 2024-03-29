import { defineConfig } from 'astro/config';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://main--sparkly-alfajores-b08ac3.netlify.app/',
  integrations: [mdx()]
});