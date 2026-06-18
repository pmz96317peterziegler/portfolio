# Peter Ziegler — Portfolio

## Starting the dev server

```
npm run dev
```

Opens at **http://localhost:4321** — the browser updates automatically when you save a file.

---

## Editing content

### Projects, Experience, Education
Open **http://localhost:4321/keystatic** while the dev server is running.  
This is the visual editor — add entries, upload images, and fill in fields there.

### Bio, hero text, links (GitHub, LinkedIn, email)
Edit **`src/config/site.ts`** directly and save. The browser hot-reloads instantly.

### Resume PDF
Go to Keystatic → **About** → paste a public link to your resume (Google Drive, Dropbox, or a file path like `/resume/resumePdf.pdf` if you dropped the file in `public/resume/`).

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
