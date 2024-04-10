import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://main--sparkly-alfajores-b08ac3.netlify.app/',
  redirects: {
    "/": "/meetings/1",
    "/sluug": "/meetings/sluug/1",
    "/stllug": "/meetings/stllug/1",
  },
  integrations: [mdx(), tailwind({
    applyBaseStyles: false
  }), icon(), sitemap()]
});
