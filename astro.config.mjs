import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
    site: "https://site.sluug.org",
    redirects: {
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
