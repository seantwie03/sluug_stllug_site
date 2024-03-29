import { z, defineCollection } from 'astro:content';

const meetingCollection = defineCollection({
    type: 'content',
    schema: z.object({
        meetingType: z.enum(['SLUUG', 'STLLUG']),
        meetingDate: z.date(),
        main: z.object({ title: z.string(), presenter: z.string(), tags: z.array(z.string()) }),
        base: z.object({ title: z.string(), presenter: z.string(), tags: z.array(z.string()) }).optional(),
        image: z
            .object({
                url: z.string(),
                alt: z.string(),
            })
            .optional(),
    }),
});

export const collections = {
    meetings: meetingCollection,
};
