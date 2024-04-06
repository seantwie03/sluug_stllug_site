import type { CollectionEntry } from "astro:content";
import { type Image, type MeetingType } from "./models";
import sluugLogo from "./images/SLUUG-Logo.png";
import stllugLogo from "./images/STLLUG-Logo.png";

export function getMeetingName(meetingType: MeetingType) {
  return meetingType === "SLUUG"
    ? `St. Louis Unix Users Group`
    : `St. Louis Linux Users Group`;
}

export function getMeetingImage(meetingType: MeetingType): Image {
  return meetingType === "SLUUG"
    ? {
        src: sluugLogo,
        alt: "St. Louis Unix Users Group Logo",
      }
    : {
        src: stllugLogo,
        alt: "St. Louis Linux Users Group Logo",
      };
}

export function sortMeetingListByMeetingDate(
  meetings: CollectionEntry<"meetings">[],
) {
  return meetings.sort(
    (a, b) => b.data.meetingDate.getTime() - a.data.meetingDate.getTime(),
  );
}
