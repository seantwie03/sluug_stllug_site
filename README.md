# SLUUG / STLLUG Site

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
|---------------------------|--------------------------------------------------|
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Pagefind

This site uses [Pagefind](https://pagefind.app/) for search. It was integrated mostly by following this guide ([Video](https://www.youtube.com/watch?v=v79VRrfVau8), [Written](https://chrispennington.blog/blog/pagefind-static-search-for-astro-sites/)).

The minified Pagefind JS and CSS is roughly 85kb. To avoid loading that on every page, it is declared in a separate `<head>` element on the `tags` page. When the site is built, the `Tags <head>` is merged with the `<head>` in `BaseLayout`.

Pagefind is called during the build script (`npm run build`). It scans all the static pages in the `/dist` folder and creates an index in `/dist/pagefind`. After building, you can run `npm run preview` to see the built output being served on your local machine.

To get this to work in dev mode (`npm run dev`) the `/dist/pagefind` directory is copied to `/public/pagefind`. This copying is accomplished using `node -e` which "should" work cross-platform (Windows, Mac, Linux).

One limitation to this implementation is that when you are running in dev mode (`npm run dev`) and you add a new markdown file, it will NOT be included in the Pagefind index. To have the new file included, you will need to run a build.
