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
    videos: z.array(z.string().nullable()).optional().default([]),
    gallery: z.array(z.string().nullable()).optional().default([]),
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

// ── Singletons ────────────────────────────────────────────────
// Each of these reads one exact file out of ./src/content. The patterns must
// stay exact filenames — a wildcard here would sweep every sibling yaml into
// whichever collection matched first.
//
// Fields are deliberately permissive: Keystatic omits a key entirely when the
// field is cleared in the admin UI, so a bare z.string() would fail the build
// the moment a field is emptied. Required-ness is enforced Keystatic-side via
// validation: { isRequired: true }, which blocks saving with a friendly error.

const site = defineCollection({
  loader: glob({ pattern: 'site.yaml', base: './src/content' }),
  schema: z.object({
    name: z.string().default(''),
    role: z.string().default(''),
    seoDescription: z.string().default(''),
  }),
});

const home = defineCollection({
  loader: glob({ pattern: 'home.yaml', base: './src/content' }),
  schema: z.object({
    greeting: z.string().default(''),
    subtitle: z.string().default(''),
    intro: z.string().default(''),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: 'about.yaml', base: './src/content' }),
  schema: z.object({
    bio: z.string().default(''),
    photo: z.string().nullable().optional(),
    resumePdf: z.string().nullable().optional(),
  }),
});

const skills = defineCollection({
  loader: glob({ pattern: 'skills.yaml', base: './src/content' }),
  schema: z.object({
    categories: z.array(z.object({
      category: z.string().default(''),
      items: z.array(z.string()).default([]),
    })).default([]),
  }),
});

const contact = defineCollection({
  loader: glob({ pattern: 'contact.yaml', base: './src/content' }),
  schema: z.object({
    intro: z.string().default(''),
    // Not .url() — an owner pasting a scheme-less link should get a bad link,
    // not a failed production build. fields.url validates in the admin.
    linkedin: z.string().nullable().optional(),
    github: z.string().nullable().optional(),
    email: z.string().nullable().optional(),
  }),
});

export const collections = { projects, experience, education, site, home, about, skills, contact };
