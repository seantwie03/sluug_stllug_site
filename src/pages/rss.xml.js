import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const sluugMeetings = await getCollection('sluug');
    return rss({
        title: 'St. Louis Unix/Linux Users Group',
        description: 'My journey learning Astro',
        site: context.site,
        items: sluugMeetings.map((meeting) => ({
            title: meeting.data.title,
            pubDate: meeting.data.pubDate,
            description: meeting.data.description,
            link: `/sluug/${meeting.slug}/`,
        })),
        customData: `<language>en-us</language>`,
    });
}
