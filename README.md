# SLUUG / STLLUG Site

A website for the St. Louis Unix/Linux Users Groups written in [Astro](https://astro.build/).

Key technologies used:

- [Typescript](https://www.typescriptlang.org/) for static typing.
- [TailwindCSS](https://tailwindcss.com/) for styling.
- [Pagefind](https://pagefind.app/) for static site search.
- [Astro Icon](https://www.astroicon.dev/) for icons.


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

## Content Collections

The majority of the content on this site is managed using Astro's [Content Collections](https://docs.astro.build/en/guides/content-collections/). The files that make up the Content Collections are located in `/src/content`. These files are written in [Markdown](https://docs.astro.build/en/guides/markdown-content/) or [MDX](https://mdxjs.com/) with [YAML frontmatter](https://dev.to/paulasantamaria/introduction-to-yaml-125f).

### Meetings

The primary Content Collection is for our Meetings in `/src/content/meetings`. Each file in this collection represents a meeting with one or more presentations. The Meetings collection contains information for both SLUUG and STLLUG. Housing all of our meetings in a single collection allows them to easily be displayed on the 'Home' page in chronological order. Additionally we can [filter](https://docs.astro.build/en/guides/content-collections/#filtering-collection-queries) the collection to only show SLUUG or STLLUG when needed.

For a full listing of all the frontmatter fields, check the `meetingCollection` schema in `/src/content/config.ts`

### Presenters

A secondary Content Collection is the Presenters in `/src/content/presenters`. Each file in this collection represents a Presenter.

The most important field in the frontmatter of each Presenter file is the `presenterName` field. This field should be the presenter's name as it should be displayed on the site.

For a full listing of all the frontmatter fields, including a detailed description, check the `presenterCollection` schema in `/src/content/config.ts`

#### Adding a New Presenter

To add a new presenter, create a new file in `/src/content/presenters`. The name of the file doesn't matter too much, but it is recommended to stick to something like: `firstName-lastName.mdx`. After creating the file, copy the contents from `_new-presenter.txt` into the blank file you created. Modify the frontmatter. **Ensure the `presenterName` exactly matches the `presenterName` field of the meeting!** Lastly, add the Presenter's Bio below the first-level markdown heading.

### Link Presenters to Meetings

On the meeting page, the presenter's name is a hyperlink to the presenter's specific page. Like-wise, on the presenter's page is a list of all the meetings that specific person presented at. In order for these links between the `preseneterCollection` and `meetingCollection` to work, the `presenterName` field must match exactly on the meeting frontmatter and the presenter frontmatter.


## Search Using Pagefind

This site uses [Pagefind](https://pagefind.app/) for search. It was integrated mostly by following this guide ([Video](https://www.youtube.com/watch?v=v79VRrfVau8), [Written](https://chrispennington.blog/blog/pagefind-static-search-for-astro-sites/)).

The minified Pagefind JS and CSS is roughly 85kb. To avoid loading that on every page, it is declared in a separate `<head>` element on the `tags` page. When the site is built, the `Tags <head>` is merged with the `<head>` in `BaseLayout`.

Pagefind is called during the build script (`npm run build`). It scans all the static pages in the `/dist` folder and creates an index in `/dist/pagefind`. After building, you can run `npm run preview` to see the built output being served on your local machine.

To get this to work in dev mode (`npm run dev`) the `/dist/pagefind` directory is copied to `/public/pagefind`. This copying is accomplished using `node -e` which "should" work cross-platform (Windows, Mac, Linux).

One limitation to this implementation is that when you are running in dev mode (`npm run dev`) and you add a new markdown file, it will NOT be included in the Pagefind index. To have the new file included, you will need stop the dev server and run a build (`npm run build`).

## Possible Options for adding AI content (Marketing Material, Images, etc.)

### 1. YAML Content Collection

Instead of having a Content Collection with `type: "content"`, I could have `type: data`. This would mean instead of using MDX files, we would just supply YAML or JSON files. These values would act as Frontmatter that could be passed into layouts and components.

#### Workflow

- Human
    - Create YAML file
- Script
    - Parse YAML
    - Send relevant prompts to AI
    - Modify YAML file to add AI content
- Astro notices changed YAML, updates page
- Human
    - Preview new page
    - Tweak YAML file as needed.

#### Pro

- Less duplication than having dozens/hundreds of MDX files. 
    - If we wanted to add/remove a component on every page, we would likely only need to change a single component or layout file.
- YAML allows multi-line strings.
    - This means a human typing the abstract in the YAML file can put new lines right in the YAML (assuming it is properly indented).
- Content would be in rigorously structured data -- easier to maintain and adapt to future requirements.
- Wouldn't need to worry about styling or formatting much, each meeting entry would have a uniform style.

#### Con

- Unable to style meeting pages individually
- Hard to style abstract text
    - Abstract would be written in YAML or JSON.
    - In the `.astro` file we would need to splitting the abstract text on '\n' and putting each split in a `<p></p>` tag to avoid a wall of text.
- Cannot add links in abstract text
    - Rather than links in the abstract text, we could have a 'References' section at the end for links.
- YAML format is very strict (white-space sensitive). It may be difficult to get AI to generate proper YAML.
    - JSON does not have multi-line string. Human's creating the json datafile would need to type '\n' when they wanted a line break in the abstract text.

#### Implementation

Search the repo for 'meetingYaml' to find a test implementation.


### 2. Script to parse MDX file and add AI content to frontmatter

This option would have a human create the MDX file with YAML frontmatter and Markdown/JSX body. Then, a script could parse it to pull the relevant information to use in the AI prompts. Then, the script could modify the MDX file to add AI content.

#### Workflow

- Human
    - Create MDX file
- Script
    - Parse YAML frontmatter of MDX file
    - Parse Markdown body content of MDX file
    - Send relevant prompts to AI
    - Modify MDX file to add AI content
- Astro notices changed MDX, updates page
- Human
    - Preview new page
    - Tweak MDX file as needed.

#### Pro

- Easy to style, add links to abstract body content.
    - Body content would be written in Markdown. Easy to add new lines, formatting, links, etc.
- Does not need a YAML file that is thrown away after MDX is generated (compared option 3).

#### Con

- MDX is more difficult to parse than YAML alone. More parsing code to maintain.
- Modifying the file to add AI content will be more difficult.
- MDX files have a lot of duplication. 
    - If we wanted to add/remove a component on every page, we would likely need to change every MDX file.

#### Implementation

Not implemented yet.
