# Vira — Personal Portfolio

My personal site. Plain static HTML/CSS/JS — no build step, no backend, no tracking.

**Live site:** https://virabuilds.github.io/vira-portfolio/ (GitHub Pages)

## What's on it

- A short, honest bio: I build simple MVP websites for small businesses and small tools that do one job well.
- What I build: MVP demo websites (free preview first), a chiptune music generator, outreach that shows the demo before asking.
- Selected projects, linked to their GitHub repos.
- Contact: a copy-email button and a mailto form that opens the visitor's own email app pre-addressed to me — nothing is sent or stored by this site.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole site |
| `styles.css` | All styling, including light/dark mode |
| `script.js` | Theme toggle, copy-email button, mailto contact form |
| `avatar.png` | My cartoon avatar |

## Deploy it (GitHub Pages)

1. Push this folder's contents to a repo (this repo) so `index.html` is at the root.
2. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Save. The site is live at `https://<username>.github.io/vira-portfolio/` within a minute or two.

## Run locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## License

MIT — see [LICENSE](LICENSE).
