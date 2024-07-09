import { SLUUG_LOGO_ALT, STLLUG_LOGO_ALT } from "@/constants.ts";
import sluugLogo from "@/images/SLUUG-Logo.png";
import stllugLogo from "@/images/STLLUG-Logo.png";
import type { CollectionEntry } from "astro:content";
import type { DisplayImage, MeetingType } from "./content/config";

export function getMeetingName(meetingType: MeetingType) {
    return meetingType === "SLUUG"
        ? `St. Louis Unix Users Group`
        : `St. Louis Linux Users Group`;
}

export function getMeetingLogo(meetingType: MeetingType): DisplayImage {
    return meetingType === "SLUUG"
        ? {
              src: sluugLogo,
              alt: SLUUG_LOGO_ALT,
          }
        : {
              src: stllugLogo,
              alt: STLLUG_LOGO_ALT,
          };
}

export function sortMeetingListByMeetingDate(
    meetings: CollectionEntry<"meetings">[],
) {
    return meetings.sort(
        (a, b) => b.data.meetingDate.getTime() - a.data.meetingDate.getTime(),
    );
}

/**
 *
 * @param length Length of the array
 * @returns A random number between 0 and length
 */
export function getRandomIndex(length: number): number {
    return Math.floor(Math.random() * length);
}

/**
 *
 * @param date Date object
 * @returns A string representing the date in the format "Month D, YYYY" Example: July 4, 2024"
 */
export function getDisplayDate(date: Date): string {
    return date.toLocaleDateString("en-US", {
        timeZone: "America/Chicago",
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

export function generateIdForHeading(heading: string) {
    return heading
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
}
