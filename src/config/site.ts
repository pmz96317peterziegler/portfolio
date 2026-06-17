/**
 * ─────────────────────────────────────────────────────────────────
 *  SITE CONFIG  —  edit this file to update your personal content
 * ─────────────────────────────────────────────────────────────────
 *
 *  For PROJECTS / EXPERIENCE / EDUCATION:
 *    Run `npm run dev` then open http://localhost:4321/keystatic
 *
 *  For everything else (bio, links, hero text):
 *    Edit below and save — the dev server hot-reloads automatically.
 *
 *  Resume PDF: upload via Keystatic admin → About → Resume PDF
 * ─────────────────────────────────────────────────────────────────
 */

export const site = {

  // ── Identity ──────────────────────────────────────────────────
  name:  'Peter Ziegler',
  role:  'Mechanical Engineering Student',

  // ── Hero Section ──────────────────────────────────────────────
  heroGreeting: 'Hi, my name is',
  heroSubtitle: "I love to build things.",
  heroBio: `I'm a Mechanical Engineering student at <strong>UGA</strong>, and I want to understand how things work all the way down, from the physics of a 6-DOF arm to the code that drives it. <strong>Robotics, automation, and the mechanics of the human body</strong> are where that curiosity lives. Most of what I build sits at the messy intersection of physics, code, and the real world.`,

  // ── About Section ─────────────────────────────────────────────
  // Photo: drop an image into public/images/ and set the path, e.g. '/images/peter.jpg'
  photo: '/images/photo.jpg',

  // Bio paragraphs — supports basic HTML like <strong>bold</strong>
    bio: [
    `The thing I keep chasing is the <strong>gap between an idea and a working version of it</strong>. I'm a Mechanical Engineering student at the <strong>University of Georgia</strong>, and what I enjoy most is taking a complex system and finding the math that describes it, whether that's the forces on someone's spine during a lift, the motion of a person's joints through a stride, or the kinematics of a robotic arm. I like that the modeling isn't the end of it. A model is only convincing once it survives contact with reality.`,
    `That's the part I care about: not letting any of it stay abstract. At some point the math has to run, or the part has to come off the <strong>water jet</strong> and weld up straight, and that step is where I do most of my learning. I'm just as interested in <strong>deriving the equations</strong> as I am in <strong>building the physical piece</strong>, and I like robotics specifically because it forces both at once. Outside of engineering I love powerlifting and volunteering at the Brooklyn Cemetery restoration project in Athens.`,
    
  ],

  // ── Links ─────────────────────────────────────────────────────
  linkedin: 'https://www.linkedin.com/in/pziegler1/',
  github:   'https://github.com/pmz96317peterziegler',
  email:    'pete.m.ziegler@gmail.com',

} as const;
