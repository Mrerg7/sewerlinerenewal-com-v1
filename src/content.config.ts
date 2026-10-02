import { defineCollection, z } from 'astro:content';

const meta = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string().url().optional(),
  }),
});

export const collections = { meta };
