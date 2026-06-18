# Implementation Plan

## Phase 1 — Project Setup
- Initialize Astro project with Tailwind CSS
- Set up folder structure (pages, components, layouts)
- Configure dark/light mode theming
- Set up Git and decide on hosting (Vercel recommended — best Astro support)

## Phase 2 — CMS Integration
- Choose and configure headless CMS (recommend Decap CMS to start — free, Git-based, no extra service to manage)
- Define content schemas for: Projects, Work Experience, Education, Skills

## Phase 3 — Layout & Design
- Build shared layout (nav, footer, dark/light toggle)
- Implement Landing section with photo and intro
- Style all sections to match the mayankd.me aesthetic (clean, image-forward)

## Phase 4 — Sections
Build out each section one at a time:
About Me → Work Experience → Projects → Skills → Education → Contact

## Phase 5 — Animations
- Add scroll-triggered animations and page transitions
- Fine-tune for smoothness on both mobile and desktop

## Phase 6 — Analytics
- Integrate analytics (recommend Umami self-hosted on Vercel — free)

## Phase 7 — Polish & Deploy
- SEO metadata (title, description, Open Graph image)
- Accessibility pass
- Performance audit
- Deploy and connect custom domain
