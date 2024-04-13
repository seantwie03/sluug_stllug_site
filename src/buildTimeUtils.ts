import type { CollectionEntry } from "astro:content";
import { type Image, type MeetingType } from "./models";
import sluugLogo from "./images/SLUUG-Logo.png";
import stllugLogo from "./images/STLLUG-Logo.png";
import { SLUUG_LOGO_ALT, STLLUG_LOGO_ALT } from "@/constants.ts";

export function getMeetingName(meetingType: MeetingType) {
  return meetingType === "SLUUG"
    ? `St. Louis Unix Users Group`
    : `St. Louis Linux Users Group`;
}

export function getMeetingImage(meetingType: MeetingType): Image {
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
