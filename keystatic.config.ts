import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },

  singletons: {
    about: singleton({
      label: 'About',
      path: 'src/content/about',
      schema: {
        resumeUrl: fields.url({
          label: 'Resume URL',
          description: 'Paste a link to your resume — Google Drive, Dropbox, or /resume/resumePdf.pdf if you uploaded one manually',
        }),
      },
    }),

    skills: singleton({
      label: 'Skills',
      path: 'src/content/skills',
      schema: {
        categories: fields.array(
          fields.object({
            category: fields.text({ label: 'Category', description: 'e.g. CAD, Programming, Manufacturing' }),
            items: fields.array(
              fields.text({ label: 'Skill' }),
              { label: 'Skills', itemLabel: props => props.value }
            ),
          }),
          { label: 'Categories', itemLabel: props => props.fields.category.value }
        ),
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
          { label: 'Gallery (additional photos)', itemLabel: (props, i) => `Photo ${(i ?? 0) + 2}` }
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
