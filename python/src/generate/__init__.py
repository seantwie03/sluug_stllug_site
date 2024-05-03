import argparse
import logging
import datetime
from langchain_community.llms import Ollama
import json

parser = argparse.ArgumentParser(description="Generate MDX file for a SLUUG meeting.")
parser.add_argument(
    "-v", "--verbose", action="store_true", help="Enable verbose debugging output"
)
args = parser.parse_args()
logging.basicConfig(
    level=logging.DEBUG if args.verbose else logging.WARNING,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

meeting = {
    "meeting_date": "2021-02-10",
    "main": {
        "title": "A Gentle Introduction to git",
        "presenter_names": ["Robert Citek"],
        "tags": ["git", "version-control"],
        "abstract": """
                    From its inception in 2005, git has gone from a version-tracking tool used by Linux kernel developers to a corporate mainstay for collaborating in teams on projects. In this talk, we'll go over the three main parts of a git project ( i.e. working folder, staging area, and repository ) and how to work with each. In the process, we'll touch on many of the git objects that make those parts ( e.g. files/folders, commits, branches, SHAs, etc. ). And we'll do that by creating and modifying a project from scratch, using git to manage the changes. By the end, you will have a good basic understanding of how to use git to work on your own projects to then branch into more advanced uses of git.
                    """,
    },
    "base": {
        "title": "Speedbar",
        "presenter_names": ["Steve Stegman"],
        "tags": ["emacs", "speedbar"],
        "abstract": """
                    Emacs' Speedbar for fast file access.

                    SpeedBar is a tool (written in EMACS) for organizing or listing files and directories

                    Speedbar is an integral part of Emacs which has been in use since version 23.2 in 2010. Entering “speedbar” in the emacs command line causes another frame to be opened to graphically show the current directory tree which can be traversed upwards and downwards from the current position. It shows all of the files and directories and each can be examined with a single mouse click. If the file is not text but a jpg or pdf or some other file type, an auxiliary program will be called to display the file in an emacs buffer.
                    """,
    },
    "youtube_url": "https://youtu.be/F4cVj1ZabFc?si=rsAqVkET1jUv5czp",
    "meetup_url": "https://www.meetup.com/saint-louis-unix-users-group/events/275750179/",
}

llm = Ollama(model="llama3")

system_prompt = """
    You are the head of Marketing and Content Strategy for the St. Louis Unix Users Group. Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.

    The Saint Louis Unix Users Group (SLUUG) is a not-for-profit professional association dedicated to education and communication among computer users. SLUUG members include many Linux and Unix professionals, Networking experts, System experts, hobbyists, and students. Also, many who are interested in Unix, Unix-like Operating Systems, Linux, BSD and other Free Open Source Software (FOSS) applications, products, projects and services.  Its purpose is to provide a forum for exchanging information about open systems, products, services and architectures. 

    The St. Louis Unix Users Group have met continuously since we incorporated in July 1992. All of our meetings are free and open to the public.

    SLUUG's Twitter Handle: @SLUUG_Org
    SLUUG's Youtube Handle: @SluugOrg
    SLUUG's Meetup Username: saint-louis-unix-users-group
    """


def generate_tweets(meeting_date, meeting_details):
    """
    Prompt the LLM to generate tweets based on the meeting details passed in.

    Dependencies:
    system_prompt (string): Reads system_prompt from global scope
    llm (dict): Calls llm from global scope
    logging (dict): Calls logging from global scope

    Parameters:
    meeting_date (string): The date the meeting will occur formatted in YYYY-MM-DD format like this: 2021-02-10
    meeting_details (dict): Information about the meeting (title, presenter_names, abstract)

    Returns:
    ["string"]: List of tweets

    Raises:
    Exception if llm cannot be called.
    Exception if output from llm cannot be parsed to a list of tweets
    """
    prompt = f"""
              {system_prompt}
              Presentation Date: {datetime.datetime.strptime(meeting_date, '%Y-%m-%d').strftime('%B %d, %Y')}
              Presentation Title: {meeting_details['title']}
              Presenter Names: {", ".join(meeting_details['presenter_names'])}
              Presentation Abstract: {meeting_details['abstract']}
              Generate three short and enthusiastic tweets that summarize this presentation that will be given to the St. Louis Unix Users Group on {meeting['meeting_date']}. 
              Use future-tense. 
              Use the Presenter's full name rather than a nickname or a twitter handle.
              Format the response like this:
              [
                  "Tweet one",
                  "Tweet two",
                  "Tweet three",
              ]
              """
    logging.debug(f"Full Prompt: \n {prompt}")
    llm_output = llm.invoke(prompt)
    logging.debug(f"Raw Output from LLM: \n {llm_output}")
    llm_json = trim_text_around_square_brackets(llm_output)
    logging.debug(
        f"Remove extra text - this should only contain a JSON array: \n {llm_json}"
    )
    tweets_list = json.loads(llm_json)
    logging.debug(f"Parsed JSON to Python List: \n {tweets_list}")
    return tweets_list


def trim_text_around_square_brackets(text_containing_bracket_pair):
    """
    Remove text occurring before and after a single balanced pair of square brackets.

    Dependencies:
    logging (dict): Calls logging from global scope

    Parameter:
    text_containing_bracket_pair (string): Any string that contains an opening and closing square bracket.
        The opening square bracket must come first.

    Returns:
    string: The square brackets and their contents.
        Any text that appears before the opening square bracket or after the closing square bracket.
        If the input did not contain a single balanced pair of square brackets, then the parameter is returned unaltered.
    """
    opening_index = text_containing_bracket_pair.find("[")
    closing_index = text_containing_bracket_pair.find("]")
    if opening_index == -1 or closing_index == -1:
        logging.warn(
            f"No bracket pair [] found in text: {text_containing_bracket_pair}"
        )
        return text_containing_bracket_pair
    return text_containing_bracket_pair[opening_index : closing_index + 1]


def main():
    max_attempts = 3
    for attempt in range(max_attempts):
        try:
            main_tweets = generate_tweets(meeting["meeting_date"], meeting["main"])
            break
        except Exception as e:
            logging.warn(f"Error on attempt {attempt+1}: {e}")
            if attempt + 1 == max_attempts:
                logging.error(
                    f"Failed to generate tweets for MAIN presentation {max_attempts} times. Aborting."
                )
                raise

    for attempt in range(max_attempts):
        try:
            base_tweets = generate_tweets(meeting["meeting_date"], meeting["base"])
            break
        except Exception as e:
            logging.warn(f"Error on attempt {attempt+1}: {e}")
            if attempt + 1 == max_attempts:
                logging.error(
                    f"Failed to generate tweets for BASE presentation {max_attempts} times. Aborting."
                )
                raise

    print(main_tweets)
    print(base_tweets)

    print(f"""
---
meetingType: "SLUUG"
meetingDate: {meeting['meeting_date']}
main:
    title: {meeting['main']['title']}
    presenterNames:
        - "Robert Citek"
    tags: ["git", "version-control"]
base:
    title: "Speedbar"
    presenterNames:
        - "Steve Stegman"
    tags: ["emacs", "speedbar"]
youtubeUrl: "https://youtu.be/F4cVj1ZabFc?si=rsAqVkET1jUv5czp"
meetupUrl: "https://www.meetup.com/saint-louis-unix-users-group/events/275750179/"
---

import MeetingPresenter from "@/components/MeetingPresenter.astro";
import Tags from "@/components/Tags.astro";
import {{ Icon }} from "astro-icon/components";

## **MAIN:** {{frontmatter.main.title}}

<MeetingPresenter presenterNames={{frontmatter.main.presenterNames}} />
{{frontmatter.meetupUrl && (
    <a href={{frontmatter.meetupUrl}}>
        <Icon name="mdi:meetup" class="inline" />
        Meetup
    </a>
)}}

From its inception in 2005, git has gone from a version-tracking tool used by Linux kernel developers to a corporate mainstay for collaborating in teams on projects. In this talk, we'll go over the three main parts of a git project ( i.e. working folder, staging area, and repository ) and how to work with each. In the process, we'll touch on many of the git objects that make those parts ( e.g. files/folders, commits, branches, SHAs, etc. ). And we'll do that by creating and modifying a project from scratch, using git to manage the changes. By the end, you will have a good basic understanding of how to use git to work on your own projects to then branch into more advanced uses of git.

<Tags tags={{frontmatter.main.tags}} />

## **BASE:** {{frontmatter.base.title}}

<MeetingPresenter presenterNames={{frontmatter.base.presenterNames}} />

Emacs' Speedbar for fast file access.

SpeedBar is a tool (written in EMACS) for organizing or listing files and directories

Speedbar is an integral part of Emacs which has been in use since version 23.2 in 2010. Entering “speedbar” in the emacs command line causes another frame to be opened to graphically show the current directory tree which can be traversed upwards and downwards from the current position. It shows all of the files and directories and each can be examined with a single mouse click. If the file is not text but a jpg or pdf or some other file type an auxiliary program will be called to display the file in an emacs buffer.

<Tags tags={{frontmatter.base.tags}} />
""")
