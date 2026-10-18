# ElbCarDetailing

Website for ElbCar Detailing, a premium car detailing service in Hamburg ([www.elbcar-detailing.de](https://www.elbcar-detailing.de)).

## Overview
A static, German-first site (with EN/TR translations) covering services, packages, before/after gallery, reviews, pricing, Instagram and a contact form (Formspree).

## Structure
- `index.html`: single-page site
- `css/style.css`, `js/main.js`: styling, i18n and interactions
- `images/`: logo, owner photo, gallery and Instagram images
- `datenschutz.html`, `impressum.html`: legal pages
- `CNAME`, `robots.txt`, `sitemap.xml`: hosting and SEO
- `TODO.md`: open ideas and tasks
- [`docs/`](docs/): project documentation, not published on the website: [hosting decision record](docs/hosting.md), [gallery guide](docs/gallery.md), [SEO notes](docs/seo.md)
- `tools/`: helper scripts, e.g. `tools/align_pairs.py` for before/after photo pairs (not published)

## Local preview
Run `python -m http.server` in this folder and open http://localhost:8000/. Opening `index.html` directly also works, but the legal pages link back to the site root (`./`), which only a server resolves to the homepage.
