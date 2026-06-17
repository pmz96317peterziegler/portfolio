import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Keystatic writes dates as native YAML dates (no quotes), so we coerce them to strings
const dateStr = z.preprocess(
  (val) => val instanceof Date ? val.toISOString().split('T')[0] : val,
  z.string()
);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    gallery: z.array(z.string().nullable()).optional().default([]),
    tags: z.array(z.string()).default([]),
    githubUrl: z.string().url().optional(),
    externalUrl: z.string().url().optional(),
    date: dateStr.optional(),
    featured: z.boolean().default(false),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/experience' }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    startDate: dateStr,
    endDate: dateStr.optional(),
    current: z.boolean().default(false),
    description: z.string(),
    technologies: z.array(z.string()).default([]),
    logo: z.string().optional(),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/education' }),
  schema: z.object({
    institution: z.string(),
    degree: z.string(),
    field: z.string(),
    minor: z.string().optional(),
    gpa: z.string().optional(),
    startDate: dateStr,
    endDate: dateStr,
    description: z.string().optional(),
    relevantCourses: z.array(z.string()).default([]),
    logo: z.string().optional(),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: 'about.yaml', base: './src/content' }),
  schema: z.object({
    resumeUrl: z.string().optional(),
  }),
});

export const collections = { projects, experience, education, about };
