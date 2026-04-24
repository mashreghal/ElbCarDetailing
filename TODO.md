# ElbCar Detailing - TODO

## High impact — conversion wins

- [ ] **Add entry prices to packages** — replace "Auf Anfrage" with "Ab 149 €" / "Ab 299 €" / "Ab 599 €" (or similar). Biggest conversion lift. Customers perceive "Auf Anfrage" as hiding a high price.
- [ ] **Simplify hero CTAs to 1 primary + 1 secondary** — now 3 buttons (Call/WhatsApp/Termin) after dropping Telegram (2026-04-24). Could go further: make WhatsApp the hero button, phone + Termin as secondary.
- [ ] **Add social proof above the fold** — e.g. "★★★★★ 4.9 aus 47 Google-Bewertungen" near the hero, not buried after the gallery.

## Medium impact

- [ ] **Add an FAQ section** (before contact) — how long does it take, where do you work (mobile/shop), rough price for Keramikversiegelung, payment options, etc.
- [ ] **Service area / location clarity** — small Google Map + "Wir bedienen ganz Hamburg und Umgebung" for trust and local SEO.
- [ ] **Service cards should have pricing hooks** — each of the 8 service cards could end with "Ab XX €" or a "Jetzt anfragen" link.
- [ ] **Page speed audit for gallery** — 9 before/after sliders = many images. Verify lazy loading + compression. Run PageSpeed Insights.

## Polish / nice-to-haves

- [ ] **Gift vouchers (Gutscheine)** — premium detailing is a great gift, easy differentiator
- [ ] **Owner's personal story** — 2–3 lines of "warum ich das mache" for emotional hook

## Operational / pending

- [ ] **Replace logo with client's PNG** — client to provide original with transparent background
- [ ] **Auto-update Instagram section via GitHub Action** — scheduled action fetches latest @elbcar posts and commits to repo
- [ ] **Tax ID in Impressum** — placeholder [DE XXXXXXXXX] needs real value
- [ ] **More languages** — Polish, Arabic, Russian discussed

## Google visibility / SEO

**Context:** On-site SEO is already solid (structured data, sitemap, meta, OG, canonical). The "invisible on Google" problem is local visibility — Google Business Profile is ~70% of the lever, website ~20%, backlinks/directories ~10%.

### This week — biggest local impact

- [ ] **Fully optimize Google Business Profile** — claim at business.google.com if not already. Set primary category "Autoaufbereitung"/"Fahrzeugaufbereitung" + secondaries (Autowaschanlage, Autopolitur). Write 750-char natural German description with Hamburg + neighborhoods. Add every service to the services list. Upload 30+ photos (before/after, team, shop, specific brands).
- [ ] **Weekly Google Posts on GBP** — like Instagram for Business Profile. A quick before/after or promo each week.
- [ ] **Review gathering routine** — target 2–4 new reviews/week. Create short review link, print QR code cards for handover, send friendly WhatsApp 24h after pickup asking for review. Ask customers to name the specific service they got.
- [ ] **Respond to every review within 24h** — good and bad. Google tracks response rate as a ranking signal.
- [ ] **Review Search Console data after 2 weeks** (around 2026-05-02) — first real data available. Look at: which queries show impressions, click-through rate, any crawl errors, mobile usability issues.
- [ ] **Monthly Search Console review** — check queries, impressions, clicks, average position. Spot keywords where we're on page 2 (positions 11–20) and push them into top 10 by tuning title/meta/content. Fix any crawl/indexing errors flagged.

### Next 1–3 months — compounds over time

- [ ] **Local citations / directory listings** — consistent Name/Address/Phone on Das Örtliche, Gelbe Seiten, 11880, Bing Places, Apple Maps, Yelp DE, Branchenbuch-Deutschland, Cylex.
- [ ] **Service-specific landing pages** — Google ranks pages, not sites. Build dedicated pages:
  - `/keramikversiegelung-hamburg`
  - `/lackkorrektur-hamburg`
  - `/autoaufbereitung-hamburg-hafen`
  - `/innenreinigung-auto-hamburg`
  Each: 400–600 words genuine content, before/after photos, local context, internal link back to packages + contact.
- [ ] **Neighborhood / area pages** — catch "near me" searches:
  - `/fahrzeugaufbereitung-altona`
  - `/autoaufbereitung-harburg`
  - (add districts as relevant)
- [ ] **Blog / "Aktuelles" section** — 1 post/month on topics customers actually Google: "Wie oft Keramikversiegelung erneuern?", "Lohnt sich Lackkorrektur beim Gebrauchtwagen?", "Was kostet professionelle Autoaufbereitung in Hamburg?"

### Ongoing — forever

- [ ] **Quality backlinks** — local Hamburg blogs, car forums, sponsor a local car club event, partner with used-car dealers (they link as detailing partner).
- [ ] **Social signals** — regular Instagram (already in TODO), consider YouTube shorts for before/after reels.
- [ ] **Track & adjust** — monthly check of Search Console + GBP insights to see what's actually driving traffic, adjust content accordingly.

### SEO top 3 if time is tight

1. **Fully optimize + post weekly on Google Business Profile**
2. **Systematic review gathering** (2–4/week, every week)
3. **Google Search Console + 3 service-specific landing pages**

## Completed

- [x] Google Search Console verified (elbcar-detailing.de, domain property, auto via GoDaddy) + sitemap.xml submitted (2026-04-18) — GSC is a monitoring tool, not a ranking booster. Effect: faster indexing + visibility into which queries drive impressions/clicks so we can tune content. Real data expected in 1–2 weeks.
- [x] Sticky mobile call button — always-visible tap-to-call on mobile (2026-04-18)
- [x] Response-time guarantee near contact form — "Antwort innerhalb eines Werktages garantiert" (2026-04-18)
- [x] Fourth package card "Nichts dabei?" for individual offer (2026-04-18)
- [x] Drop Basis package, keep Premium / Exklusiv / Individuell (2026-04-18)
- [x] Review translations EN/TR with "Translated from German" note
- [x] Google Maps links open business listing directly
- [x] Google reviews section with 5-star ratings
- [x] Angebot & Preise section between Über Uns and Kontakt
- [x] Custom domain elbcar-detailing.de
- [x] Formspree endpoint switched to client's (elbcar.detailing@gmail.com)
- [x] Owner photo added and styled
- [x] Logo restored to original blue/silver with transparent background
- [x] Hero CTA buttons (mobile + desktop): Call, WhatsApp, Telegram, Termin
- [x] Brighter Elbe blue palette
- [x] Mobile hero spacing optimized
