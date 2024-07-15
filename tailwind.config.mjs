/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {},
        colors: {
            link: {
                DEFAULT: "#4daafc",
                dark: "#4daafc",
                light: "#0000ff",
            },
            bg_normal: {
                DEFAULT: "#1f1f1f",
                dark: "#1f1f1f",
                light: "#f0f9ff",
            },
            bg_emphasis: {
                DEFAULT: "#181818",
                dark: "#181818",
                light: "#add6ff80",
            },
            bg_alt: {
                light: "#ffffff",
            },
            txt_normal: {
                DEFAULT: "#cccccc",
                dark: "#cccccc",
                light: "#1f1f1f",
            },
            txt_subtle: {
                DEFAULT: "#969696",
                dark: "#969696",
                light: "#4b5563",
            },
            conn_banner: {
                DEFAULT: "#181818",
                dark: "#181818",
                light: "#eab308",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
