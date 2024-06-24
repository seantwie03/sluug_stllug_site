import { sortMeetingListByMeetingDate } from "@/buildTimeUtils";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
    const allMeetings = sortMeetingListByMeetingDate(
        await getCollection("meetings"),
    );
    return rss({
        title: "St. Louis Unix/Linux Users Group",
        description: "RSS Feed of our monthly SLUUG and STLLUG meetings",
        site: context.site,
        items: allMeetings.map((meeting) => ({
            title: meeting.id,
            pubDate: meeting.data.meetingDate,
            link: `/meetings/${meeting.id}/`,
        })),
        customData: `<language>en-us</language>`,
    });
}
