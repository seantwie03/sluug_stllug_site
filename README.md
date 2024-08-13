# SLUUG / STLLUG Site

A website for the Stl Linux Unix Users Group written in [Astro](https://astro.build/).

Key technologies used:

-   [Typescript](https://www.typescriptlang.org/) for static typing.
-   [TailwindCSS](https://tailwindcss.com/) for styling.
-   [Pagefind](https://pagefind.app/) for static site search.
-   [Astro Icon](https://www.astroicon.dev/) for icons.

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| ------------------------- | ------------------------------------------------ |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Content Collections

The majority of the content on this site is managed using Astro's [Content Collections](https://docs.astro.build/en/guides/content-collections/). The files that make up the Content Collections are located in `/src/content`. The meeting content files are written in [JSON](https://www.json.org/json-en.html). The Presenter content files are written in [MDX](https://mdxjs.com/) with [YAML frontmatter](https://dev.to/paulasantamaria/introduction-to-yaml-125f).

### Meetings

The primary Content Collection is for our Meetings in
`/src/content/meetings`. Each file in this collection represents a meeting with one or more presentations. The Meetings collection contains information for both SLUUG and STLLUG. Housing all of our meetings in a single collection allows them to easily be displayed on the 'Home' page in chronological order. Additionally, we can [filter](https://docs.astro.build/en/guides/content-collections/#filtering-collection-queries) the collection to only show SLUUG or STLLUG when needed.

#### Adding a New Meeting

To add a new meeting to the site, create a new JSON file somewhere beneath
`/src/content/meetings`. The JSON file must have the following fields:

-   meetingType
-   meetingDate
-   presentations (at least one item in this array)
    -   title
    -   presenterNames (at least one item in this array)
    -   abstract

For a full listing of all the json fields, check the `meetingCollection` schema in `/src/content/config.ts`

### Presenters

A secondary Content Collection is the Presenters in `/src/content/presenters`. Each file in this collection represents a Presenter.

The most important field in the frontmatter of each Presenter file is the `presenterName` field. This field should contain the presenter's name as it will be displayed on the site.

For a full listing of all the frontmatter fields, including a detailed description, check the `presenterCollection` schema in `/src/content/config.ts`

#### Adding a New Presenter

To add a new presenter, copy
`/src/content/presenters/_new-presenter.txt` to
`/src/content/presenters/firstName-lastName.mdx`. The name of the file doesn't matter too much, but it is recommended to stick to something like:
`firstName-lastName.mdx`. Modify the frontmatter. Lastly, add the Presenter's Bio below the first-level Markdown heading.

### Link Presenters to Meetings

On the meeting page, the presenter's name is a hyperlink to that presenter's page. Like-wise, on the presenter's page is a list of all the meetings that person presented at. In order for these links between the
`preseneterCollection` and
`meetingCollection` to work, the
`presenterName` field in the presenter's Markdown frontmatter must match exactly one of the items in the
`presenterNames` array in the meeting JSON.

## Search Using Pagefind

This site uses [Pagefind](https://pagefind.app/) for static site search. It was integrated mostly by following this guide ([Video](https://www.youtube.com/watch?v=v79VRrfVau8), [Written](https://chrispennington.blog/blog/pagefind-static-search-for-astro-sites/)).

The minified Pagefind JS and CSS is roughly 85kb. To avoid loading that on every page, it is declared in a separate `<head>` element on the `tags` page. When the site is built, the `Tags <head>` is merged with the `<head>` in `BaseLayout`.

Pagefind is called during the build script (`npm run build`). It scans all the static pages in the `/dist` folder and creates an index in `/dist/pagefind`. After building, you can run `npm run preview` to see the built output being served on your local machine.

To get this to work in dev mode (`npm run dev`) the `/dist/pagefind` directory is copied to `/public/pagefind`. This copying is accomplished using `node -e` which "should" work cross-platform (Windows, Mac, Linux).

One limitation to this implementation is that when you are running in dev mode (`npm run dev`) and you add a new content file, it will NOT be included in the Pagefind index. To have the new file included in the index, you will need stop the dev server and run a build (`npm run build`). Then, start the dev server again.

## Linting

[Husky](https://typicode.github.io/husky/) is used to run prettier on all staged files prior to commit. This is mostly an attempt to have consistent spacing on all the JSON files, but it seems to work well, so it is ran on all files that prettier knows how to format.
