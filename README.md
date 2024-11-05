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

## Current Workflow

Our current workflow is almost entirely manual. It largely breaks down into two parts:

1. Before the meeting
    1. Or, after the presnter sends their information
2. After the meeting
    1. Or, after the presenter sends their slides / the recording is available for download

### Before Meeting

1. Presenters sends Title, Abstract, and Presenter Name to Steercom email.

#### Site Update

1. Convert that information to JSON format.
1. Run Node.js script to call OpenAI to generate marketing content. Several options are generated.
1. Select and tweak the best option from what the AI generates by modifying the JSON file.
1. Copy JSON file and image to site repo
1. Run site in Dev-mode to confirm changes look as expected.
1. Push changes to GitHub
1. Wait ~5 minutes
1. Verify changes on site.sluug.org

#### Meetup and Socials

1. Manually Edit Meetup Page by copy/pasting from site
1. Manually Post Twitter/Mastodon by copy/pasting from site

### After Meeting

1. Presenter sends slides to Steercom email
1. Recording is downloaded from Zoom

#### Files Upload

1. Recording and Slides are uploaded to sluug.org
1. \*JSON file is created listing meeting files - Not Yet Implemented

#### YouTube, Site Embed, Socials

1. Recording is uploaded to YouTube
1. Add "youtubeUrl" field to meeting JSON file
1. Run site in Dev-mode to confirm YT embed looks as expected.
1. Push changes to GitHub
1. Wait ~5 minutes
1. Verify YT embed on site.sluug.org
1. Post to Twitter/Mastodon that recording is posted to YT.

### Thoughts

The workflow involves the following systems:

-   GitHub
-   Meetup
-   Twitter
-   Mastodon
-   Zoom (Download Recording)
-   YouTube
-   Bock (Upload Recording / Slides)

Let's analyze each one:

-   GitHub
    -   This is where the source code for the new site is stored
    -   Highly automatable
-   Meetup
    -   Unable to automate - API Access requires PRO subscription
    -   Could automate generation of copy/pastable text
        -   Right now to generate the Meetup text, I have to copy/paste several individual chunks and play with formatting on each individual post
-   Twitter
    -   Could be automated, but may limit impact/reach
    -   Probably best to keep it manual
    -   Text is already generated in one copy/pastable chunk
-   Mastodon
    -   Could be automated
    -   Good candidate for automation
-   Zoom
    -   Unknown
-   YouTube
    -   Could be automated but it is complicated, requires manual approval from YT
    -   Could automate generation of copy/pastable description text
        -   Right now to generate the Meetup text, I have to copy/paste several individual chunks and play with formatting on each individual post
    -   Could add subtitles from Zoom download
-   Bock
    -   Uploading files to specific directory
    -   Getting the meeting date exactly correct
    -   Create JSON listing of files per meeting - Not Yet Implemented

## Automation

What is the best case scenario for Automation?

**Trigger**: Presenter sends information to Steercom Email

**Action**: The first person to see the email could:

-   Login to the Admin area of site.sluug.org
-   Create a new Meeting by filling the information from the Presenter into the "New Meeting" form
-   Admin would hit a "Generate" button
-   Meeting information is sent to OpenAI
-   After a few seconds the user is presented with several editable text boxes for the AI generated content
    -   Tweets
    -   YouTube Titles
-   Admin would select the best option, then tweak the text as desired. Or, Admin could hit Generate again to get more choices from AI.
-   Admin would be presented with several image options.
-   Admin would select an image. Or, Admin could hit Generate again to get more choices from AI.
-   Admin would see a preview of what the meeting would look like on site.sluug.org
-   Admin would hit 'Save' or 'Finish'
-   Mastodon post would be submitted automatically
-   Admin would be presented with single block of text to copy/paste into Meetup.com
-   Admin would be presented with single chunk of text to copy/paste into Twitter

**Trigger**: Presenter sends slides to Steercom Email / Zoom recording is available for download

**Action**: The first person to see the email could:

-   Login to the Admin area of site.sluug.org
-   Find the meeting and click the Edit button
-   Click "Add Files" button
    -   Files are uploaded to Bock in the correct spot.
    -   They are also added to meeting page of site
-   Click "Upload Video" button
    -   Video is automatically uploaded to YouTube (YT)
    -   OR
    -   Description text is generated in single copy/pastable chunk
-   Mastodon post would be submitted automatically with YT link
-   Admin would be presented with single chunk of text to copy/paste into Twitter to post about the YT recording

## Fullstack Site

In order to enable these automations we need some part of the site to run on a server. As of now the site is built using static JSON files and served via Netlify. This will not work for the automation scenarios described above. For those scenarios we need to be able to save data input into the form. We also need to execute privileged tasks (upload files to Bock, YT, etc.). There are a lot of ways to run part of a site on a server.

### Separate API w/SSR

In this scenario we have a JSON "REST" API running on Bock. The API would be written in something like Typescript, Java, or Go. The API would manipulate data in some sort of datastore like a Postgres Database. It would receive HTTP GET, POST, PUT, and DELETE methods and perform the automation tasks listed above. Some actions, like those that modify data in the database or call an external service, would require authentication.

Once the JSON API is running, we could use Astro.js in two ways.

1. Pull data from API at build time.
    1. This method would require Astro 5 which is currently in Beta. The current Astro site pulls data from JSON and Markdown files at build time to create static pages. Astro 5 allows using a REST API to pull data at build time, so instead of pulling the data from the files to build static pages, it would pull data from the JSON API to build pages. This creates a 'build-time' dependency on the JSON API. Using this method, we could not build the site if the JSON API is 'down.' The benefit of this approach is runtime performance. There is nothing faster than serving static HTML files from a web server.
2. Run Astro using an SSR Adapter.
    1. This method would require us to run an Astro SSR Adapter on Bock. This means we would have three things running on Bock, the JSON API, the SSR Adapter, and a Web Server acting as a reverse proxy. With Astro the SSR adapter means when the site is built very few (if any) pages are statically generated. Instead, when a user requests a page, that request will go to the SSR adapter. The SSR adapter will make a request to the JSON API. The SSR adapter will receive the data and generate HTML "on the fly." The HTML will be sent to the user's browser. This is essentially the way Ruby / ASP.NET / JSP web pages have worked forever. The reason why we want to generate the HTML on the server and send it to the browser is for Search Engine Optimization (SEO). When Google is crawling your site, it won't index sites that are client rendered, so the HTML needs to be generated on the server.

This option is really centered around having a separate JSON API. Separating out this code has distinct advantages and disadvantages:

#### Pros

-   Separation
    -   Putting the "backend" code into a separate code base means we can change out the UI layer more easily compared to the other options.

#### Cons

-   Complexity
    -   Putting the "backend" code into a separate code base means we will have two code bases to maintain, possibly in two different programing languages with two different frameworks.
    -   More "things" need to be running for the site to be "up."
-   Duplication
    -   Types, Validation, Authentication, etc. will need to be done twice. Once on the frontend and again on the JSON API.

### SSR over DB

In this scenario we use Astro's SSR Adapter to talk directly to the database, file system, external services, etc.

Since the SSR Adapter is running on the server, this means we can do things like have the Adapter securely access databases, file systems, etc just the same as a JSON API running on a server can. This approach is simpler than having a separate JSON API because you only maintain a single code base. Also, the network connections happen over RPC so you don't need to do Types, Validation, etc. twice. The downside of this is the lack of separation. If we want to move from Astro to some new UI framework we wouldn't just be replacing our frontend, we'd be replacing everything. Some may say this is mitigated by Astro's Island archticture which allows many UI frameworks to be used within an Astro application.

### File Datastore

In this scenario we would continue using JSON and Markdown files as the datastore rather than a database.

## API Routes

-   POST /login
-   ? /callback
-   GET /meetings
-   POST /meetings
-   GET /meetings/:id
-   PUT /meetings/:id
-   GET /meetings?presenterId=:id
-   GET /meetings?meetingType=:SLUUG|STLLUG|STEERCOM|OTHER
-   GET /meetings?presenterId=:id
-   GET /presenters
-   POST /presenters
-   GET /presenters/:id
-   PUT /presenters/:id
-   GET /presentations
-   GET /presentations/:id
-   GET /presentations?meetingId:id
-   GET /presentations?presenterId=:id
