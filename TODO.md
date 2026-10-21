# ElbCar Detailing - TODO

*Note: For current SEO strategy, keyword mapping, and owner action items, see [`docs/seo.md`](docs/seo.md). For the 2026-10-21 usability, resilience, and validation pass and review follow-ups, see [`docs/gemini-fix-brief.md`](docs/gemini-fix-brief.md), [`docs/gemini-review-followup.md`](docs/gemini-review-followup.md), and [`docs/verification/`](docs/verification/).*

## High impact — conversion & content wins

- [ ] **Add entry prices to package cards** — the package cards (`Premium` / `Exklusiv` / `Individuelles Angebot`) still state *"Preis je nach Fahrzeuggröße und Zustand"* while guide prices by vehicle size are shown in the ledger above them (added 2026-05-04). Per-package or per-service starting prices wait for owner confirmation (`docs/seo.md`, section 5).
- [ ] **Align vehicle-size terminology between guide prices and enquiry form** — the guide-price categories in `#pricing` (`Kleinwagen`, `Kompaktwagen`, `SUV`, `Transporter`) differ from the enquiry-size choices in `#contactForm` (`Klein (z. B. Polo, Golf)`, `Mittel (Limousine)`, `Groß (SUV, Kombi)`, `Transporter` — e.g. Golf is grouped under *Klein* in the form). Align the terminology once the intended mapping is confirmed with the owner; do not infer a new price classification for vehicle types.
- [x] **Simplify hero CTAs to 1 primary + 1 secondary** — implemented in the v3 layout: WhatsApp is the primary CTA, with phone and form link as secondary actions.
- [x] **Add social proof above the fold** — implemented in the trust strip immediately below the hero (`5,0 · 83 Bewertungen auf Google`, `Kleinwagen ab 150 €`, `Nur mit Termin`, and address).

## Medium impact

- [x] **Add an FAQ section** (before contact) — implemented in section `06 Häufige Fragen` (`#faq`) with 9 questions and standalone answers (`SEO-04`).
- [x] **Service area / location clarity** — consent-based Google Map (`#mapConsent`), address in trust strip/about/FAQ/contact/footer, and *"für Kunden aus ganz Hamburg und Umgebung"* in About and FAQ.
- [x] **Service cards should have pricing/booking hooks** — each of the 8 services in `#services` has an *"Anfragen →"* link that pre-selects the service in `#contactForm`, and guide prices lead `#packages`.
- [x] **Gallery image optimization (WebP, responsive `srcset`/`sizes`, lazy loading, progressive disclosure)** — all 8 aligned before/after pairs use responsive WebP sources with `loading="lazy"` and `decoding="async"` (see [`docs/gallery.md`](docs/gallery.md)).
- [ ] **Live PageSpeed Insights & Search Console Core Web Vitals check** — verify field/lab performance on the live domain after deploys (see [`docs/seo.md`](docs/seo.md), section 2 & 5).

## Polish / nice-to-haves

- [ ] **Gift vouchers (Gutscheine)** — pending owner questionnaire (`docs/seo.md`, section 5).
- [ ] **Owner's personal story / experience details** — pending owner questionnaire (`docs/seo.md`, section 5).

## Operational / pending

- [ ] **Replace logo with client's original PNG** — if a higher-resolution source file is provided by the client.
- [ ] **Auto-update Instagram section via GitHub Action** — optional future automation; currently the studio photography band links directly to `@elbcar`.
- [x] **Tax ID in Impressum** — not needed: Ahmet is a Kleinunternehmer (§ 19 UStG, confirmed by email 2026-10-09); the Impressum carries the Kleinunternehmer note.
- [ ] **More languages / dedicated `/en/` and `/tr/` URLs** — evaluate against Search Console and customer demand first (`docs/seo.md`, section 6 A).

## Google visibility / SEO (owner & account actions)

**Context:** On-site technical SEO, structured data (`AutomotiveBusiness` + `WebSite` `@graph`), canonical URLs, `sitemap.xml`, and `robots.txt` are implemented and verified (see [`docs/seo.md`](docs/seo.md)). The remaining local ranking levers require owner/account access:

### Priority 1 — immediate owner actions (see `docs/seo.md`, section 5)

- [ ] **Remove opening hours from Google Business Profile** — set to appointment-only (no main hours), add *"Besuche nur nach vorheriger Terminvereinbarung"*, and add WhatsApp + `#contact` appointment links at `business.google.com`.
- [ ] **Update Instagram bio and claim Apple Business Connect** — replace *"10-17 Uhr"* with *"Nur mit Termin"* on Instagram; claim Apple Maps place `I293CB7910510DA0D` and remove its hours.
- [ ] **Fully optimize Google Business Profile** — list all 8 services and the packages, verify attributes, and upload additional before/after photos.
- [ ] **Weekly Google Posts on GBP** — post a before/after photo and service highlight every 1–2 weeks.
- [ ] **Review gathering routine & replies** — use the direct review link / QR code at handover and reply to every review; confirm current review count for the website monthly.
- [ ] **Search Console review & re-indexing** — export baseline numbers, request indexing after deploys, and review queries/impressions monthly.

### Priority 2 — next 1–3 months

- [ ] **Bing Places & Bing Webmaster Tools** — import from Google Business Profile *after* opening hours are removed; submit `sitemap.xml`.
- [ ] **Local citations / directory listings** — consistent Name/Address/Phone without opening hours on Das Örtliche, Gelbe Seiten, Das Telefonbuch, hamburg.de, Yelp, Cylex, OpenStreetMap, 11880, and werkenntdenbesten.
- [ ] **Service-specific landing pages (blocked on owner questionnaire, `docs/seo.md` section 6 B)** — build `/keramikversiegelung-hamburg`, `/lackkorrektur-hamburg`, and `/innenreinigung-hamburg` only once owner facts (durations, process details, pricing scope) are confirmed.
- [~] ~~**Neighborhood / district landing pages** (`/fahrzeugaufbereitung-altona`, `/autoaufbereitung-harburg`, etc.)~~ — **Superseded / decided against** in [`docs/seo.md`](docs/seo.md) (section 6 B & 6 E): district pages would be doorway pages and go beyond the confirmed *"Hamburg und Umgebung"* framing.
- [ ] **Quality backlinks & social signals** — local automotive partners, clubs, and regular Instagram/video updates.

## Roadmap: Google ranking + Google Ads (added 2026-10-09, updated 2026-10-21)

### 1. Legal basics
- [x] Get VAT ID (or Kleinunternehmer note) from Ahmet and fix Impressum (Ahmet replied 2026-10-09: *"Ich bin Kleinunternehmer und habe keine Umsatzsteuer"*)
- [x] Update law references in Impressum (DDG and MStV instead of TMG and RStV)
- [x] Update Datenschutz for GitHub hosting, Formspree and Google Maps
  - [ ] Formspree data transfer to the USA (noted 2026-10-18): Formspree is not on the official EU-US Data Privacy Framework list. Options: (a) request a DPA with EU Standard Contractual Clauses from Formspree, or (b) move form handling to a Cloudflare Worker + Email Service when migrating hosting (see [`docs/hosting.md`](docs/hosting.md)).

### 2. Get found on Google
- [ ] Fully set up Google Business Profile (remove opening hours, add services, packages, photos, WhatsApp link)
- [ ] Weekly reviews and reply to every review
- [ ] Weekly Business Profile posts
- [ ] Local directory listings with identical name, address, phone (no hours)
- [ ] Service landing pages (`Keramikversiegelung`, `Lackkorrektur`, `Innenreinigung`) once owner questionnaire is answered
- [~] ~~District pages (Altona, Harburg, ...)~~ — **Superseded**; decided against in [`docs/seo.md`](docs/seo.md)
- [x] `LocalBusiness` (`AutomotiveBusiness` + `WebSite`) structured data, refreshed `sitemap.xml`, consistent `www` canonicals and `robots.txt` (`SEO-06` to `SEO-08`)
- [ ] Monthly Search Console review

### 3. Site improvements
- [x] Compress gallery images (WebP, responsive `srcset`, lazy loading) and align before/after pairs (`docs/gallery.md`)
- [x] FAQ section (`#faq`) and social proof in the trust strip near the top (`ab` prices on individual package cards remain open pending owner input)
- [ ] Optional: Cloudflare migration (see [`docs/hosting.md`](docs/hosting.md))

### 4. Google Ads (later)
- [ ] Cookie consent banner with Consent Mode v2 (required before running ads/conversion tags)
- [ ] Conversion tracking for form, phone, WhatsApp
- [ ] Ads account, link Business Profile, check Keyword Planner costs
- [ ] Test: 10–15 EUR/day for 6–8 weeks, compare cost per enquiry with job value

## Completed

- [x] **Implementation brief & review follow-up fixes ([`docs/gemini-fix-brief.md`](docs/gemini-fix-brief.md), [`docs/gemini-review-followup.md`](docs/gemini-review-followup.md), 2026-10-21)** — all 6 brief tasks and 3 review follow-up items implemented and verified locally (see [`docs/verification/`](docs/verification/)):
  1. **Task 1 (P1) & Follow-up #1 (P2):** Added compact mobile header language disclosure (`#langDropdown` / `#langTrigger` / `#langPicker`) with globe icon, native language names (`Deutsch`, `English`, `Türkçe`), >=44×44px touch targets, keyboard/Escape/outside-click handling, panel coordination with `#navMenu`, and focus transfer across the `1100px` breakpoint (`1099px <-> 1100px`) between mobile and desktop header language controls (`preventScroll`); hid duplicate mobile header WhatsApp CTA below `1100px` while preserving `.mbar`, hero/contact CTAs, and desktop header controls at >=1100px.
  2. **Task 2 (P2):** Removed premature `<head>` `.js` hiding marker; made `.fade-in` content visible by default in CSS; gated gallery collapsing on `.is-collapsible` installed by `initGalleryMore()`; provided a compact in-flow mobile navigation fallback across `index.html`, `impressum.html`, and `datenschutz.html` when JS is disabled or `js/main.js` fails; isolated initializers with `runInit()` and guarded `IntersectionObserver`.
  3. **Task 3 (P2) & Follow-up #2 (P3):** Removed unreachable Telegram option from `#contactForm` preferences; gated callback/WhatsApp radio options on conditional validation readiness (`[data-channel-cond]`); conditionally required `#cf-phone` with visible hint (`#cf-phone-hint`) and `.req` label when callback or WhatsApp is selected; separated missing-required (`form_error_phone`), malformed-required (`form_error_phone_invalid`), and malformed-optional (`form_error_phone_optional`) phone error messages across DE/EN/TR and re-evaluated active phone errors on channel change while preserving user input and existing `aria-describedby` IDs.
  4. **Task 4 (P3):** Made hero image `<link rel="preload">` media queries mutually exclusive (`(aspect-ratio > 1/1) and (min-height: 521px)` vs `(max-aspect-ratio: 1/1), (max-height: 520px)`), eliminating duplicate hero preloads at square viewports (`800×800`).
  5. **Task 5 (P3):** Removed static empty `<img src="" alt="">` from `#lightbox`; dynamically created and attached the `<img>` with valid `src` and `alt` when opening the lightbox and removed it on close.
  6. **Task 6 (P3) & Follow-up #3:** Reconciled `TODO.md`, included all 6 before/after screenshots in `docs/screenshots/`, and saved reproducible standalone Node and Chromium CDP verification scripts and raw results in `docs/verification/`.
- [x] SEO pass, former name *Fahrzeugaufbereitung Parlack*, project docs (`docs/seo.md`, `docs/gallery.md`, `docs/hosting.md`) (2026-10-19)
- [x] Reference prices by vehicle size in Angebot & Preise section (2026-05-04) — Kleinwagen ab 150 €, Kompaktwagen ab 200 €, SUV ab 250 €, Transporter ab 300 €
- [x] Google Search Console verified (`elbcar-detailing.de`, domain property, auto via GoDaddy) + `sitemap.xml` submitted (2026-04-18)
- [x] Sticky mobile call/WhatsApp action bar (2026-04-18)
- [x] Response-time promise near contact form (2026-04-18)
- [x] Custom offer option ("Nichts dabei?") and Premium / Exklusiv packages (2026-04-18)
- [x] Review translations EN/TR with "Translated from German" note
- [x] Google Maps links open business listing directly + privacy-friendly click-to-load embedded map
- [x] Google reviews section with 5-star ratings
- [x] Custom domain `elbcar-detailing.de`
- [x] Formspree endpoint switched to client's (`elbcar.detailing@gmail.com`)
- [x] Owner photo added and styled
- [x] Logo with transparent background and responsive WebP `srcset`
