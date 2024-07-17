import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

import { baseUrl } from "@/constants";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    site: `${baseUrl}`,
    redirects: {
        "/": "/meetings/1",
        "/sluug": "/meetings/sluug/1",
        "/stllug": "/meetings/stllug/1",
    },
    integrations: [
        mdx(),
        tailwind({
            applyBaseStyles: false,
        }),
        icon(),
        sitemap(),
    ],
});
