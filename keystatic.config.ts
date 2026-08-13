import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },

  ui: {
    navigation: {
      'Page Content': ['home', 'about', 'skills', 'contact'],
      'Lists': ['experience', 'projects', 'education'],
      'Global': ['site'],
    },
  },

  singletons: {
    site: singleton({
      label: 'Site & SEO',
      path: 'src/content/site',
      schema: {
        name: fields.text({
          label: 'Your Name',
          description: 'Shown in the hero heading, the footer, and the browser tab title.',
          validation: { isRequired: true },
        }),
        role: fields.text({
          label: 'Your Title / Role',
          description: 'e.g. "Mechanical Engineering Student". Used in the browser tab and Google results.',
          validation: { isRequired: true },
        }),
        seoDescription: fields.text({
          label: 'Search-engine Description',
          multiline: true,
          description: 'One or two sentences shown under your name in Google results and link previews. Aim for ~155 characters.',
          validation: { isRequired: true },
        }),
      },
    }),

    home: singleton({
      label: 'Home / Intro Section',
      path: 'src/content/home',
      schema: {
        greeting: fields.text({
          label: 'Small greeting line',
          description: 'The little line above your name, e.g. "Hi, my name is"',
          validation: { isRequired: true },
        }),
        subtitle: fields.text({
          label: 'Big tagline',
          description: 'The large line under your name, e.g. "I love to build things."',
          validation: { isRequired: true },
        }),
        intro: fields.text({
          label: 'Intro paragraph',
          multiline: true,
          description: 'Supports markdown: **text** for bold. Blank line = new paragraph.',
          validation: { isRequired: true },
        }),
      },
    }),

    about: singleton({
      label: 'About Me Section',
      path: 'src/content/about',
      schema: {
        bio: fields.text({
          label: 'About me',
          multiline: true,
          description: 'Supports markdown: **text** for bold. Leave a blank line between paragraphs.',
          validation: { isRequired: true },
        }),
        photo: fields.image({
          label: 'Photo',
          directory: 'public/images',
          publicPath: '/images',
          description: 'A portrait-orientation photo of you (roughly 3:4).',
        }),
        resumePdf: fields.file({
          label: 'Resume (PDF)',
          directory: 'public/resume',
          publicPath: '/resume',
          description: 'Upload a PDF. Uploading a new one replaces the old. Leave empty to hide the Resume button in the menu.',
        }),
      },
    }),

    skills: singleton({
      label: 'Technical Skills',
      path: 'src/content/skills',
      schema: {
        categories: fields.array(
          fields.object({
            category: fields.text({
              label: 'Category',
              description: 'e.g. CAD & Design, Programming, Fabrication',
              validation: { isRequired: true },
            }),
            items: fields.array(
              fields.text({ label: 'Skill', validation: { isRequired: true } }),
              { label: 'Skills', itemLabel: props => props.value }
            ),
          }),
          { label: 'Categories', itemLabel: props => props.fields.category.value }
        ),
      },
    }),

    contact: singleton({
      label: 'Contact Section',
      path: 'src/content/contact',
      schema: {
        intro: fields.text({
          label: 'Intro paragraph',
          multiline: true,
          description: 'The short paragraph above the contact links.',
        }),
        linkedin: fields.url({ label: 'LinkedIn URL' }),
        github:   fields.url({ label: 'GitHub URL' }),
        email:    fields.text({
          label: 'Email address',
          description: 'Just the address, e.g. you@example.com — no "mailto:".',
        }),
      },
    }),
  },

  collections: {
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({
          label: 'Description',
          multiline: true,
          description: 'Supports markdown: use - for bullet points, **text** for bold, # for headings',
        }),
        image: fields.image({ label: 'Main Image', directory: 'public/images/projects', publicPath: '/images/projects' }),
        gallery: fields.array(
          fields.image({ label: 'Photo', directory: 'public/images/projects', publicPath: '/images/projects' }),
          // itemLabel receives only `props` — there is no index argument, so
          // show the uploaded filename instead. Name files descriptively
          // before uploading and the list becomes self-documenting.
          { label: 'Gallery (additional photos)', itemLabel: props => props.value?.filename ?? 'Photo' }
        ),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          { label: 'Tags', itemLabel: props => props.value }
        ),
        githubUrl: fields.url({ label: 'GitHub URL' }),
        externalUrl: fields.url({ label: 'External Link', description: 'Google Drive, project page, etc.' }),
        date: fields.date({ label: 'Date' }),
        featured: fields.checkbox({
          label: 'Featured',
          description: 'Show in the large featured layout (unchecked = small card in the grid below)',
        }),
      },
    }),

    experience: collection({
      label: 'Work Experience',
      slugField: 'company',
      path: 'src/content/experience/*',
      schema: {
        company: fields.slug({ name: { label: 'Company' } }),
        role: fields.text({ label: 'Role / Title' }),
        startDate: fields.date({ label: 'Start Date' }),
        endDate: fields.date({ label: 'End Date', description: 'Leave blank if current position' }),
        current: fields.checkbox({ label: 'Current Position' }),
        description: fields.text({
          label: 'Description',
          multiline: true,
          description: 'Supports markdown: use - for bullet points, **text** for bold',
        }),
        technologies: fields.array(
          fields.text({ label: 'Technology' }),
          { label: 'Technologies Used', itemLabel: props => props.value }
        ),
        logo: fields.image({ label: 'Company Logo', directory: 'public/images/logos', publicPath: '/images/logos' }),
        videos: fields.array(
          fields.file({
            label: 'Video',
            directory: 'public/videos/experience',
            publicPath: '/videos/experience',
          }),
          {
            label: 'Looping videos (optional)',
            description: 'Short silent clips that loop, like GIFs. They split the width evenly — one fills the row, two go half and half. Keep each a few seconds and under ~5MB; they are stored in the repo. MP4 works best.',
            itemLabel: props => props.value?.filename ?? 'Video',
          }
        ),
        gallery: fields.array(
          fields.image({
            label: 'Photo',
            directory: 'public/images/experience',
            publicPath: '/images/experience',
          }),
          { label: 'Photos (optional)', itemLabel: props => props.value?.filename ?? 'Photo' }
        ),
      },
    }),

    education: collection({
      label: 'Education',
      slugField: 'institution',
      path: 'src/content/education/*',
      schema: {
        institution: fields.slug({ name: { label: 'Institution' } }),
        degree: fields.text({ label: 'Degree', description: 'e.g. Bachelor of Science' }),
        field: fields.text({ label: 'Major / Field of Study', description: 'e.g. Mechanical Engineering' }),
        minor: fields.text({ label: 'Minor / Certificate (optional)', description: 'Any supplemental credential, e.g. "Certificate of Artificial Intelligence" — leave blank if none' }),
        gpa: fields.text({ label: 'GPA (optional)', description: 'e.g. 3.8 / 4.0 — leave blank to hide' }),
        startDate: fields.date({ label: 'Start Date' }),
        endDate: fields.date({ label: 'End Date' }),
        description: fields.text({
          label: 'Description / Achievements',
          multiline: true,
          description: 'Supports markdown: use - for bullet points, **text** for bold',
        }),
        relevantCourses: fields.array(
          fields.text({ label: 'Course Name' }),
          { label: 'Relevant Courses', itemLabel: props => props.value }
        ),
        logo: fields.image({ label: 'Institution Logo', directory: 'public/images/logos', publicPath: '/images/logos' }),
      },
    }),
  },
});
