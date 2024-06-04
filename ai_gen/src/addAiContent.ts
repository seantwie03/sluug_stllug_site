#!/usr/bin/env -S npm run tsn -T

import { argv } from "node:process";
import { open } from "node:fs/promises";
import { Meeting, meetingSchema } from "./models.js";

// "You are the head of Marketing and Content Strategy for the St. Louis Unix Users Group. Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.\nThe Saint Louis Unix Users Group (SLUUG) is a not-for-profit professional association dedicated to education and communication among computer users. SLUUG members include many Linux and Unix professionals, Networking experts, System experts, hobbyists, and students. Also, many who are interested in Unix, Unix-like Operating Systems, Linux, BSD and other Free Open Source Software (FOSS) applications, products, projects and services. Its purpose is to provide a forum for exchanging information about open systems, products, services and architectures.\nThe St. Louis Unix Users Group have met continuously since we incorporated in July 1992. All of our meetings are virtual, free, and open to the public.\nSLUUG's Twitter Handle: @SLUUG_Org\nSLUUG's Youtube Handle: @SluugOrg\nSLUUG's Meetup Username: saint-louis-unix-users-group",
// 'Presentation Date: 2021-02-10\nPresentation Title: A Gentle Introduction to git\nPresenter Names: Robert Citek\nPresentation Abstract: From its inception in 2005, git has gone from a version-tracking tool used by Linux kernel developers to a corporate mainstay for collaborating in teams on projects. In this talk, we\'ll go over the three main parts of a git project ( i.e. working folder, staging area, and repository ) and how to work with each. In the process, we\'ll touch on many of the git objects that make those parts ( e.g. files/folders, commits, branches, SHAs, etc. ). And we\'ll do that by creating and modifying a project from scratch, using git to manage the changes. By the end, you will have a good basic understanding of how to use git to work on your own projects to then branch into more advanced uses of git.\n\nGenerate three short and enthusiastic tweets that summarize this presentation that will be given to the St. Louis Unix Users Group on 2021-02-10.\nUse future-tense.\nUse the Presenter\'s full name rather than a nickname or a twitter handle.\n\nOutput the response in JSON following JSON Schema below:\n\n{ \n  "type": "array",\n  "items": {\n    "type": "string"\n  }\n}\n'

const filePath = argv[2];

if (argv.length < 3) {
    throw "No file path provided.";
}

async function readMeetingFile(filePath: string): Promise<Meeting> {
    try {
        const file = await open(filePath);
        const jsonBuffer = await file.readFile();
        return meetingSchema.parse(JSON.parse(jsonBuffer.toString()));
    } catch (error) {
        console.error(
            `Error reading or parsing JSON Meeting file: ${filePath}`
        );
        throw error;
    }
}

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
    throw "Environment Variable: OPENAI_API_KEY not found.";
}

async function main() {
    const meeting = await readMeetingFile(filePath);
    console.log(meeting);
}

main();
