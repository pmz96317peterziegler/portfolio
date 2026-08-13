# Peter Ziegler — Portfolio

## Starting the dev server

```
npm run dev
```

Opens at **http://localhost:4321** — the browser updates automatically when you save a file.

---

## Editing content

Everything is edited at **http://localhost:4321/keystatic** while the dev server is running. Nothing needs to be edited in VS Code.

The admin sidebar is grouped:

**Page Content**
- **Home / Intro Section** — the greeting line, big tagline, and intro paragraph
- **About Me Section** — your bio, your photo, and your resume PDF
- **Technical Skills** — skill categories and the skills inside them
- **Contact Section** — the closing paragraph, LinkedIn, GitHub, and email

**Lists**
- **Work Experience**, **Projects**, **Education** — multiple entries each

**Global**
- **Site & SEO** — your name, your title, and the description Google shows

### Resume PDF
Keystatic → **About Me Section** → **Resume (PDF)** → upload the file. Uploading a new one replaces the old. Clear the field to hide the Resume button in the nav.

### Formatting text
The bio and intro boxes support markdown: wrap text in `**double asterisks**` to bold it, and leave a blank line between paragraphs.

---

## Deploying updates

Once the site is on Vercel, every push to `main` triggers a redeploy automatically:

```
git add .
git commit -m "your message"
git push
```

> Run each line separately in PowerShell — `&&` does not work in PowerShell.

Vercel picks it up and goes live in ~1 minute.

---

## Adding images

Drop files into `public/images/` and reference them as `/images/filename.jpg`.  
For project galleries, use Keystatic to upload — it handles the paths for you.

---

## What still needs work

**High priority (recruiters will notice):**
- Skills section — currently empty, fill it in via Keystatic
- GitHub links on projects — repos exist, just add the URLs in Keystatic
- Object Avoiding Robot and Inverted Pendulum Table descriptions — very short compared to featured projects

**Nice to have:**
- Custom domain (e.g. `peterziegler.dev`) — buy on Namecheap/Cloudflare (~$12/yr), add in Vercel → Settings → Domains
- OG image — replace `public/og-image.png` with a real social preview image
