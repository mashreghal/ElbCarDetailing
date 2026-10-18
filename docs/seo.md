# SEO notes

*As of 2026-10-18. What Google and Bing see of www.elbcar-detailing.de, what was changed on the website and why, and what Ahmet still has to do. This file is not published on the website (`docs` is in the `exclude` list of `_config.yml`); the README links here.*

*Sources: four audits on 2026-10-18 (technical; text and search terms; local listings and brand; languages and search-result appearance), a tested prototype of the changes, and a final check of the branch `seo/optimize` on a local copy. Search Console data, Business Profile insights and real-user speed data cannot be seen from outside; they are in Ahmet's accounts (section 5).*

## In short

- **The website itself is in good shape.** Lighthouse scores 100 for SEO, Accessibility and Best Practices. Redirects and canonical tags are clean, the structured data is valid, and the site loads no trackers.
- **The biggest problems are outside the website.** Google Maps, Apple Maps and the Instagram bio show opening hours (Mo–Fr 10–17), although ElbCar Detailing works by appointment only. The business is missing from several directories and has fewer reviews than the competitors that rank across Hamburg.
- **The website changes of 2026-10-18:**
  - the main heading now uses the main search term "Autoaufbereitung";
  - the search snippet and the FAQ show the guide prices;
  - two headings name Finkenwerder;
  - the About text mentions the former name Parlack;
  - the structured data is more complete (section 2).
- **Most important next step:** remove the opening hours from the Google Business Profile (section 5, first row).

Terms used below:

- **Canonical tag:** tells Google which address is the preferred one when the same page answers under several addresses.
- **Structured data:** a machine-readable block (JSON-LD) in the page head with name, address, phone and services.
- **LCP:** when the biggest element (here the hero photo) appears; good is under 2.5 s.
- **TBT:** how long the page cannot react to taps while it loads.
- **CLS:** how much the layout jumps while it loads.

## 1. Starting point (2026-10-18, before the changes)

The live site was at commit `47afdf6`, then at `ebbeb60`. That second commit changed only the gallery; the page head was identical.

### 1.1 Technical

- **Redirects.** Every address variant reaches `https://www.elbcar-detailing.de/` with one permanent redirect (301) and no chains: `http://`, the address without `www`, `mashreghal.github.io/ElbCarDetailing/`, and the legal pages without `www`.
- **Connection.** The certificate covers both names and is valid until 2027-01-08. HTTP/2 via Fastly; the server answers in 10–130 ms.
- **Pages for Google.** `/`, `/impressum.html` and `/datenschutz.html` each name themselves as the preferred address (canonical tag), and all three are in `sitemap.xml`.
- **robots.txt and Search Console.** `robots.txt` allows everything and names the sitemap. Search Console is verified through a DNS TXT record.
- **Duplicate addresses.** `/index.html`, `/index`, `/impressum`, `/datenschutz`, `/?lang=en` and `/?lang=tr` also answer, but their canonical tag points Google to the preferred address.
- **Errors and hidden files.** Unknown addresses get a real 404, and the custom 404 page is marked `noindex`. `README.md`, `TODO.md` and `_config.yml` are not published (404).
- **GitHub Pages limits.** Every file is cached for only 10 minutes (`max-age=600`). There are no custom headers (no HSTS, no `X-Robots-Tag`) and no server-side redirects, so `/index.html` can only be handled with the canonical tag (see `docs/hosting.md`).
- **What Google renders.** Google sees the same German page as a visitor: same title, description, canonical and H1, about 1,430 words, 72 links and 0 requests to other hosts. All content is in the HTML, so it is visible even with JavaScript off.

### 1.2 Lighthouse on the live site (version 12.8.2)

| Page | Device | Performance | LCP | TBT | CLS |
|---|---|---|---|---|---|
| Home | Phone, 5 runs | 74–89, median 84 | 2.04–2.42 s, median 2.39 s | 388–1,082 ms, median 520 ms | 0–0.008 |
| Home | Desktop, 3 runs | 100 | 0.49–0.61 s | 0–52 ms | 0.016–0.028 |
| Impressum | Phone, 2 runs | 92 / 99 | 2.72 / 1.73 s | 50 / 85 ms | 0.001 |
| Impressum | Desktop | 100 | 0.45 s | 4 ms | – |
| Datenschutz | Phone | 99 | 1.73 s | 0 ms | 0.031 |

- **Scores.** SEO, Accessibility and Best Practices were 100 in all 13 runs.
- **Slow test CPU.** Lighthouse itself warned that the test CPU was slower than its baseline, so the phone TBT values are probably too high.
- **Layout work.** Of 3.0–4.4 s main-thread time on the phone, 2.3–3.2 s went to style and layout. Part of that came from the German texts being rewritten on every load (changed in SEO-09).
- **First load on a phone.** 15 requests and 467 KiB: HTML 19.7 KB, CSS 12.7 KB, JS 27 KB, fonts about 71 KB, studio photos about 285 KB.
- **Host limit.** Short cache lifetimes (13 files, about 405 KiB that returning visitors download again) come from GitHub Pages and cannot be fixed there.
- **Run Lighthouse in German.** The Lighthouse command line uses an English browser by default, and the site then shows English. Always audit with `--lang=de-DE` (section 7).

### 1.3 Text and headings (before)

- **Title:** "Autoaufbereitung Hamburg-Finkenwerder | ElbCar Detailing", 56 characters / 529 px. It fits: desktop results show about 580 px.
- **Description:** 150 characters / 967 px. Google's desktop result cuts at about 920 px, so it ended with "…Nur mit Termin – jetzt".
- **Headings:** the H1 was "Premium Fahrzeug­aufbereitung in Hamburg", with a hidden soft hyphen inside the word. None of the content H2 headings named the place or a search term.
- **Text:** about 1,400 words of German text.
  - Counts in all body text, closed FAQ answers included: "Autoaufbereitung" 1×, Finkenwerder 6×, Hamburg 14×.
  - Competitors use "Autoaufbereitung" far more often: CBS 24×, Saubermacher 13×, Car-Tex 7×.
  - The FAQ answer about cost pointed to the price list but gave no prices.

### 1.4 Structured data (before)

There was one valid `AutomotiveBusiness` block. It held name, address, phone, e-mail, map link, logo, images, Instagram, price range and area, correctly without opening hours and without ratings.

What it lacked: a stable `@id`, a `WebSite` node, and any `sameAs` link besides Instagram.

### 1.5 Rankings

Google Maps rank among the listed businesses (not counting ads), with the map centred on four places:

| Search | Finkenwerder | Altona | Hamburg-Mitte | Harburg |
|---|---|---|---|---|
| Autoaufbereitung | 1 | 8 | 33 | 24 |
| Fahrzeugaufbereitung | 1 | 4 | 14 | 20 |
| Car Detailing | 1 | 7 | 15 | 14 |
| Keramikversiegelung | 1 | 6 | 14 | 9 |
| Lackaufbereitung | 1 | 3 | 14 | 6 |
| Autopflege | 1 | 6 | 17 | 16 |
| Autoaufbereitung Hamburg | 1 | 9 | 31 | 23 |

- **Google web search.** #1 with the knowledge panel for "Autoaufbereitung Finkenwerder". Not in the top 10 for "Autoaufbereitung Hamburg", "Fahrzeugaufbereitung Hamburg", "Keramikversiegelung Hamburg" or "Car Detailing Hamburg".
- **Outdated results.** Google and Bing still showed the old homepage title. Google also showed the old transparent-logo favicon and an old Impressum snippet ("Angaben gemäß § 5 TMG"). This changes after Google crawls the pages again (section 5).

### 1.6 Listings, reviews and brand

- **Google Business Profile.** 5,0 stars from 84 reviews, 75 photos, category "Dienst für professionelle Autopflege".
  - Listing IDs: CID `5230025975414018470`, Place ID `ChIJKw5qYACFsUcRplGeLurIlEg`.
  - Direct link: https://maps.google.com/?cid=5230025975414018470
- **Wrong opening hours** (Mo–Fr 10:00–17:00) appear in three places:
  - Google;
  - Apple Maps (place `I293CB7910510DA0D`, which nobody has claimed);
  - the Instagram bio ("10-17 Uhr").
- **Name, address, phone, website.** They match on Google, Apple, 11880, werkenntdenbesten and Instagram.
- **Missing listings.** Bing Places, Das Örtliche, Gelbe Seiten, hamburg.de, Yelp and OpenStreetMap. Cylex could not be checked.
- **Reviews.** New reviews arrive at about 2 per month (+26 in 12 months). Around Hamburg-Mitte, the top 15 businesses for "Autoaufbereitung" have a median of about 113 reviews; ElbCar Detailing was #30 there with 84.
- **Map pin.** The site's coordinates are 68 m from Google's pin and 2 m from Apple's.
- **Similar names.**
  - In Maps, "ElbCar" and "Elbcar Hamburg" open Elbcar KFZ-Meisterwerkstatt.
  - "Elb Car Detailing" lists Elb CarCare first.
  - "Parlack Hamburg" opens ElbCar Detailing. Parlack is the company's former name, confirmed for the owner on 2026-10-18.

### 1.7 Competitors

- **Pages that rank for a service** are dedicated pages with "[Service] Hamburg" in the title, H1 and address. They have 1,000–2,700 words and up to 11 FAQs:
  - car-tex.de: homepage 2,718 words; Keramik page 1,532 words and 9 FAQs;
  - cbs-fahrzeugaufbereitung.de: 1,653 words; Keramik page with 11 FAQs;
  - krieger-detailing.de: Lackkorrektur page;
  - emcleancar.de: Innenraumreinigung page;
  - mobiclean-hamburg.de.
- **Directory pages rank too.** The hamburg.de list "Autoaufbereitung Hamburg", Das Örtliche, and the stilpunkte.de list "Die 10 besten Fahrzeugaufbereiter in Hamburg", which appeared for 5 of 8 sampled searches.
- **Prices in snippets.** Ranking competitors show prices in their search snippets (e.g. "Kleinwagen ab 99 €", "Komplettaufbereitung ab 399 €").

## 2. What was changed on 2026-10-18

Branch `seo/optimize`. Pull request: *(fill in after the merge)*.

Commits on the branch:

- `4d97add`: SEO-01 to SEO-05;
- `d34abf9`: SEO-06;
- `7e9066f`: SEO-07 and SEO-08;
- `337aaa5`: SEO-09;
- `8ce6b6a`: the former name;
- the commit that adds this file.

A squash merge creates one new commit on `main`; note its hash here.

**Before merging:** if the merge happens after 2026-10-18, set the homepage `<lastmod>` in `sitemap.xml` to the day it goes live.

| ID | Change | Before → after | Files |
|---|---|---|---|
| SEO-01 | Search description shorter and with a price (DE/EN/TR); the description for Facebook and WhatsApp previews is now identical; the unused `keywords` tag is removed | "Autoaufbereitung und Autopflege … Nur mit Termin – jetzt anfragen." (150 characters, cut off) → "Autoaufbereitung in Hamburg-Finkenwerder: Innenreinigung, Lackkorrektur, Keramikversiegelung. Kleinwagen ab 150 €, nur mit Termin." (130 characters, fits) | `index.html`, `js/main.js` |
| SEO-02 | The main heading uses the main search term | "Premium Fahrzeug­aufbereitung in Hamburg" → "Premium Autoaufbereitung in Hamburg"; EN and TR unchanged | `index.html`, `js/main.js`, `css/style.css` (comment only) |
| SEO-03 | Two headings name the place; the paint correction text adds the synonym "Lackaufbereitung" | "Professionelle Fahrzeugpflege für höchste Ansprüche" → "… in Hamburg-Finkenwerder"; "Eindrücke aus der Halle" → "Eindrücke aus unserer Halle in Finkenwerder" | `index.html`, `js/main.js` |
| SEO-04 | FAQ answers that stand on their own (DE/EN/TR) | The cost answer lists the guide prices; the Keramik answer is a full sentence and names the Exklusiv package; new question "Können Kratzer im Lack entfernt werden?" | `index.html`, `js/main.js` |
| SEO-05 | Image descriptions (alt texts) name the place and the service | Hero photo "…in der Halle von ElbCar Detailing in Hamburg-Finkenwerder"; engine pair "…Motorwäsche"; Volvo pair "…Innenreinigung" | `index.html`, `js/main.js` |
| SEO-06 | Structured data as a `@graph` | The business gets the `@id` `…/#business`, the Google listing (CID) as `hasMap` and `sameAs`, and the 8 services as an `OfferCatalog`; new `WebSite` node. Still no hours, ratings or reviews | `index.html` |
| SEO-07 | The legal pages link to the preferred homepage address | 16 links `index.html…` → `./…` | `impressum.html`, `datenschutz.html`, `README.md` |
| SEO-08 | Sitemap date of the homepage | `lastmod` 2026-10-17 → 2026-10-18; legal pages unchanged | `sitemap.xml` |
| SEO-09 | German page loads keep the HTML as it is instead of rewriting all 274 texts with the same words | Less work for phones on every German page view; the language buttons carry their state in the HTML | `js/main.js`, `index.html` |
| Name | The former name is mentioned once (DE/EN/TR) | About: "Bei ElbCar Detailing – früher Fahrzeugaufbereitung Parlack – …"; structured data `alternateName` "Fahrzeugaufbereitung Parlack". Review texts unchanged | `index.html`, `js/main.js` |

### Checked before the merge (local copy, branch compared with `main`, night of 18 to 19 October)

- **Text and translations**
  - The German HTML matches `translations.de` exactly (274 translated elements), and every key exists in German, English and Turkish (274 each).
  - Switching DE → TR → DE gives exactly the first page again.
  - An English browser gets English, `?lang=tr` gives Turkish, and Googlebot always gets German.
- **Search snippet**
  - The title is 529 px.
  - Description: German 130 characters / 842 px, English 135 / 836 px. Both are under the limit of about 920 px.
  - The Turkish description is 155 characters / 975 px, too long for a search result. JavaScript sets it only after a switch to Turkish, so it is never indexed. Shorten it during the Turkish wording review (section 5).
- **Search terms in the text** (all body text, closed FAQ answers included):

  | Term | Before | After |
  |---|---|---|
  | Autoaufbereitung | 1 | 3 |
  | Finkenwerder | 6 | 8 |
  | Lackaufbereitung | 1 | 2 |
  | Kratzer | 2 | 4 |
  | "ab 150 €" | 2 | 3 |
  | Parlack | 2 | 3 |

- **Layout**
  - No horizontal scrolling and no word cut in the middle at 27 widths from 320 to 1920 px, in all three languages.
  - The new H1 takes 3 lines on phones from 320 to 414 px (before: 2 to 4), 2 lines at 430–540 px, 1 line at 600–999 px, and 3 lines in the desktop layout, as before.
  - On most phones the WhatsApp button moves down by up to 34 px and stays well above the fold. On a 320×568 phone it moves up by 33 px, because the H1 there now takes 3 lines instead of 4.

  | Phone screen | Button bottom before | After |
  |---|---|---|
  | 390×844 | 476 px | 510 px |
  | 412×915 | 493 px | 526 px |
  | 414×896 | 494 px | 528 px |
  | 320×568 | 490 px | 457 px |

- **Pages**
  - Tested: home (DE/EN/TR), Impressum, Datenschutz and 404 at 320×640, 390×844 and 1440×900.
  - Result: no console errors, no failed requests and no horizontal scrolling.
  - No page contacts another host before a click.
- **Contact form** (sending replaced by a stub in the test; nothing was sent)
  - The success message appears in DE, EN and TR, and the form resets.
  - An empty form is stopped by the browser's required-field check.
- **Images:** every displayed image loads, its width and height match the file, and all have alt text.
- **Links:** all 16 links on the legal pages land on the homepage at the right section, also from `/impressum` and `/datenschutz`.
- **Structured data**
  - Valid JSON with an `AutomotiveBusiness` node and a `WebSite` node, listing the 8 services.
  - 0 problems against the current schema.org vocabulary.
  - No opening hours and no ratings.
- **HTML check (html-validate):** the same findings as before the changes, none new.
- **Speed (SEO-09)**
  - Test setup: an emulated phone with a 4× slower CPU, 9 runs each.
  - The start-up code that runs when the page is ready took a median of 158 ms instead of 181 ms.
  - The time the page could not react to taps fell from 144 to 122 ms.
  - An earlier prototype measured a larger gain (207 → 73 ms). In this final check the browser had usually drawn the page before the start-up code ran, so one full layout was needed either way.
- **Lighthouse 12.8.2 on the local copy** (German; 3 phone runs and 2 desktop runs each for `main` and the branch)
  - Phone performance 88 → 88; desktop 100 → 100.
  - SEO, Accessibility and Best Practices 100 in every run.
  - TBT 0 ms for both versions, because the test computer is fast. CLS at most 0.016.
  - Impressum scored 97 and Datenschutz 96 on the phone.
  - The local server sends files uncompressed, so LCP (3.7 s on the phone) is higher than on the live site. Compare only runs made the same way.

### Deliberately not changed

- The Turkish wording ("Araç Bakımı"): it needs a native speaker (section 5).
- The review count "83 Bewertungen": Google showed 84, so Ahmet needs to confirm the current number (section 5).
- The coordinates in the structured data: they wait for Ahmet to confirm the map pin.
- "Keine festen Öffnungszeiten – Besuche nur nach vorheriger Terminvereinbarung": the text is correct and stays.
- One address for all three languages: a decision for later (section 6 A).

### After the deploy (fill in)

| Check | Result |
|---|---|
| Lighthouse on the live site, German, phone and desktop | |
| Search Console URL inspection shows the H1 "Premium Autoaufbereitung in Hamburg" | |
| Sitemap status in Search Console ("Erfolgreich", 3 URLs) | |
| Rich Results Test: "Local business", 0 errors | |

## 3. Keyword map

| Search term | Where the site targets it | Notes |
|---|---|---|
| Autoaufbereitung Hamburg / Finkenwerder | Title, H1, description, About ("Hier bieten wir Autoaufbereitung und Autopflege …"), FAQ "Was kostet eine Autoaufbereitung?" | The main term of the homepage. #1 around Finkenwerder; the goal is reach across Hamburg. |
| Fahrzeugaufbereitung | About subtitle, About first paragraph (former name), Exklusiv note, footer | Synonym. |
| Autopflege | About ("… Autoaufbereitung und Autopflege …"), structured-data description | Also the Business Profile category ("Dienst für professionelle Autopflege"). |
| Innenreinigung | Service 1, packages, Volvo and VW image texts, reviews | Possible page `/innenreinigung-hamburg` (section 6 B). |
| Lackkorrektur, Lackaufbereitung, Polieren, Kratzer entfernen | Service 3, FAQ "Können Kratzer im Lack entfernt werden?", About second paragraph, Exklusiv package | Possible page `/lackkorrektur-hamburg`. |
| Keramikversiegelung | Service 4, FAQ "Wie lange schützt eine Keramikversiegelung?", Exklusiv package, reviews | Possible page `/keramikversiegelung-hamburg`. |
| Motorwäsche | Service 5, engine image texts | |
| Scheinwerferaufbereitung | Service 6, gallery | |
| Lederreinigung & -pflege | Service 7 | |
| Reifenwechsel | Service 8, FAQ "Wechseln Sie auch Reifen?" | |
| Preise, Kosten ("Was kostet …") | Description "Kleinwagen ab 150 €", FAQ cost answer, price list, structured data `priceRange` | Guide prices only; the final price depends on condition, effort and package. |
| Leasingrückgabe | Only inside reviews | Own text needs Ahmet's facts (questionnaire, section 5). |
| ElbCar Detailing (brand) | End of the title, `og:site_name`, structured data (`WebSite`) | Always write the full name: "ElbCar" alone leads to another business in Maps. |
| Parlack, Fahrzeugaufbereitung Parlack (former name) | About first paragraph (DE/EN/TR), structured data `alternateName`, two reviews | People may still search for the old name; Maps already sends "Parlack Hamburg" to the listing. Never edit the review texts. |
| English "car detailing Hamburg"; Turkish "oto kuaför", "detaylı (iç) temizlik", "pasta cila", "seramik kaplama" | Only through the language buttons (JavaScript), so not indexable | Depends on the decision about `/en/` and `/tr/` pages (section 6 A). |

Rules:

- One main search term per page.
- No district pages and no keyword stuffing; place names in two or three headings at most.
- Only facts Ahmet has confirmed.

The SEO section in `TODO.md` is older than these audits. Where the two differ (district pages, FAQ rich results), this file applies.

## 4. Local SEO checklist

- [ ] The business is written the same way everywhere: **ElbCar Detailing · Köhlfleet-Hauptdeich 3 · 21129 Hamburg · +49 155 63205346 · https://www.elbcar-detailing.de/**
- [ ] No opening hours anywhere: website, structured data, Google, Apple, Bing, Instagram, Facebook, directories. Write "Nur mit Termin" or "Termine nach Vereinbarung" instead.
- [ ] Google Business Profile:
  - [ ] hours removed;
  - [ ] WhatsApp and appointment links added;
  - [ ] the 8 services and the packages (as products) added;
  - [ ] a post every 1–2 weeks;
  - [ ] only true attributes;
  - [ ] the name without extra keywords.
- [ ] Apple Business Connect: place claimed, hours deleted.
- [ ] Bing Places imported from Google after the hours fix, without hours; Bing Webmaster Tools with the sitemap.
- [ ] Directories: Das Örtliche, Gelbe Seiten, Das Telefonbuch, hamburg.de, Yelp, Cylex, OpenStreetMap; 11880 and werkenntdenbesten claimed.
- [ ] Review routine (QR card and WhatsApp link) and a reply to every review; the review count on the website updated monthly.
- [ ] Map pin confirmed on Google and Apple, then the coordinates in the structured data updated.
- [ ] Social profiles consistent (Instagram, Facebook, YouTube) and added to the structured data once confirmed.
- [ ] Old Parlack profiles renamed to ElbCar Detailing with the current address (not deleted).
- [ ] The full name and the direct Maps link (or a QR code to it) on cards, stickers and invoices.

## 5. Owner action list

| Priority | Action | Where / how | Status |
|---|---|---|---|
| 1 – this week | Remove the opening hours from the Google Business Profile; add the WhatsApp and appointment links | business.google.com (details below) | open |
| 1 – this week | Instagram bio: replace "10-17 Uhr" with "Nur mit Termin"; write "21129 Hamburg" instead of "21129 HH" | Instagram app → Edit profile | open |
| 1 – this week | Search Console: export the numbers **before** the deploy; after it, "Indexierung beantragen" for `/` and `/impressum.html` | search.google.com/search-console (details below) | open |
| 1 – this week | Refresh the link previews (Facebook, Telegram, WhatsApp) | details below | open |
| 2 – next 2–4 weeks | Claim the Apple Maps place and delete its hours | businessconnect.apple.com | open |
| 2 | Bing Places (import from Google **after** the hours fix) and Bing Webmaster Tools | bing.com/forbusiness, bing.com/webmasters | open |
| 2 | Free directory entries | list below | open |
| 2 | Review routine with replies | details below | open |
| 2 | Business Profile: services, products, posts, attributes | details below | open |
| 2 | Check the demand for English and Turkish pages | Search Console, section 6 A | open |
| 3 – when the facts are there | Answer the open questions: review count, map pin, languages, Turkish wording, questionnaire, Facebook/YouTube | "Facts we need from Ahmet" below | open |
| Done 2026-10-18 | Former name Parlack confirmed, mentioned on the website and in the structured data | – | done; old Parlack profiles still to rename |
| Monthly | Search Console queries and pages, review count, Maps spot check, profiles still without hours | section 7 | ongoing |

**Google Business Profile: remove the hours (highest priority).** Checked signed out on 2026-10-18: Maps shows "Geschlossen · Öffnet Mo um 10:00" with Mo–Fr 10:00–17:00. Google's guidelines say a business that works only by appointment should not list hours.

1. business.google.com → Edit profile → Hours → "Open with no main hours" (label in the English interface).
2. Delete any "More hours" and special hours.
3. Add "Besuche nur nach vorheriger Terminvereinbarung" to the description.
4. Under Contact, add the WhatsApp link https://wa.me/4915563205346 and the appointment link https://www.elbcar-detailing.de/#contact.
5. Check the Maps panel again after 1–3 days.

Do this before the Bing import, because Bing copies the hours.

**Instagram and Apple Maps.** Google shows the Instagram bio as a snippet for the brand search and for "Autoaufbereitung Finkenwerder". The Apple Maps place `I293CB7910510DA0D` shows Mo–Fr 10–17 and the link "Anspruch auf diesen Ort erheben".

1. Claim the place in Apple Business Connect and verify it.
2. Delete the hours.
3. Keep name, address, phone and website exactly as on the website.

Then check Facebook, WhatsApp Business and every other profile for hours.

**Search Console.** Before the deploy, open Leistung → Suchergebnisse and export the queries and pages for the last 3 and 16 months. Note impressions and positions for:

- Autoaufbereitung Hamburg
- Autoaufbereitung Finkenwerder
- Fahrzeugaufbereitung Hamburg
- Keramikversiegelung Hamburg
- Lackaufbereitung Hamburg
- Autopflege Hamburg
- Car Detailing Hamburg
- ElbCar Detailing

After the deploy:

1. URL-Prüfung for https://www.elbcar-detailing.de/ → Live-Test. The HTML must be German with the H1 "Premium Autoaufbereitung in Hamburg". Then "Indexierung beantragen".
2. The same for `/impressum.html`.
3. Sitemaps: `sitemap.xml` shows "Erfolgreich" with 3 URLs.
4. Seiten: only `/`, `/impressum.html` and `/datenschutz.html` are indexed. `/index.html`, `/impressum`, `/datenschutz` and `?lang=` addresses appear as "Alternative Seite mit richtigem kanonischen Tag".
5. Core Web Vitals: note the status ("nicht genügend Daten" is normal for a small site).
6. Check the positions again after 4–6 weeks.

**Link previews and favicon.** Until 2026-10-18 the preview image was a 701 KB transparent logo.

- Facebook Sharing Debugger (developers.facebook.com/tools/debug): enter the homepage and click "Scrape Again".
- Telegram: send the address to @WebpageBot.
- WhatsApp: send the link to yourself.

Google still shows the old favicon. Check again 1–3 weeks after "Indexierung beantragen" via https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.elbcar-detailing.de&size=64, and keep the favicon file names unchanged.

**Bing.** Bing's panel for "ElbCar Detailing Hamburg" shows Elb CarCare, Bing Maps does not find the business, and Bing's result still has the old title.

1. Fix the Google hours first.
2. bing.com/forbusiness → "Import from Google Business Profile"; verify, and confirm that no hours came across.
3. Bing Webmaster Tools: import the property from Search Console and submit https://www.elbcar-detailing.de/sitemap.xml.

Bing's index also feeds DuckDuckGo, Ecosia and Copilot.

**Free directory entries.**

- Das Örtliche, Gelbe Seiten and Das Telefonbuch (one Eintragsservice entry covers all three).
- hamburg.de Branchenbuch: its "Autoaufbereitung Hamburg" page is on page 1 of Google.
- Yelp, Cylex, and an OpenStreetMap entry without `opening_hours`.
- Claim the existing 11880 and werkenntdenbesten entries.
- Ask stilpunkte.de how businesses get onto "Die 10 besten Fahrzeugaufbereiter in Hamburg".

Use exactly the line from section 4 and the category Autoaufbereitung/Autopflege. Enter no hours; if a directory insists, write "Termine nach Vereinbarung". Skip paid listing bundles.

**Reviews.**

- Ask every customer: a QR card at handover and a WhatsApp message the same day with https://search.google.com/local/writereview?placeid=ChIJKw5qYACFsUcRplGeLurIlEg.
- Invite customers to say what was done (e.g. Keramikversiegelung, Innenreinigung), but don't write the text for them.
- No rewards, and ask every customer, not only the happy ones.
- Reply to every review within a few days.

**Business Profile beyond the hours.**

- Add the 8 services with the website's descriptions.
- Add Premium, Exklusiv and Individuell as products with their feature lists, without prices.
- Make sure the description names Hamburg-Finkenwerder, "Nur nach vorheriger Terminvereinbarung" and "Richtpreise ab 150 €".
- Post every 1–2 weeks, e.g. a before/after photo with the service name.
- Add extra categories only for services really offered (e.g. "Autowäsche" for the hand wash, a tyre category if Google lists one).
- Check that the wheelchair attributes are true, or remove them.
- Keep the name "ElbCar Detailing" without extra keywords.

The local audit found that Google has retired public questions and answers on profiles, so the description and the website FAQ have to carry those answers.

**Brand name.** Write "ElbCar Detailing" in full on cards, stickers, invoices, bios and directory entries. Give customers https://maps.google.com/?cid=5230025975414018470 (or a QR code to it) instead of asking them to search.

### Facts we need from Ahmet

Nothing from this list goes on the website before he confirms it.

1. **Review count.** The website says "83 Bewertungen auf Google"; Google showed 84 on 2026-10-18. Once Ahmet gives the current number:
   - update `reviews_count` in all three dictionaries in `js/main.js`: DE "N Bewertungen auf Google", EN "N reviews on Google", TR "Google'da N yorum";
   - update both places in `index.html` (trust strip and reviews score);
   - run the sync check (section 7).

   Repeat monthly, or switch to wording without a number.
2. **Map pin.** The site uses 53.5342197, 9.8806538; Google's pin is at 53.5336458, 9.8803105 (68 m away). Ahmet checks in the Business Profile and in Apple Business Connect that the pin sits on the entrance customers should drive to. Then set the structured-data `geo` to that point.
3. **Languages.** If enquiries are handled in German, English and Turkish, add `"knowsLanguage": ["de", "en", "tr"]` to the business node. Optionally add a `contactPoint` with phone, e-mail and languages, but no hours.
4. **Turkish wording.** The Turkish texts use "araç bakımı", which usually means servicing at a garage: title, description, H1, About subtitle, footer and services heading.
   - Turkish customers search for "oto kuaför", "detaylı (iç) temizlik", "pasta cila" and "seramik kaplama".
   - A native speaker confirms the wording before the Turkish texts change.
   - At the same time, shorten the Turkish description (975 px; the limit is about 920 px).
   - Ideas from the audit: title "Oto Kuaför Hamburg-Finkenwerder | ElbCar Detailing"; service 3 "Pasta Cila & Boya Düzeltme".
5. **Questionnaire for more content.** Each confirmed answer can become an FAQ entry, an About sentence or text for a service page.
   1. Years of experience or start year, and any training.
   2. Typical duration per service and per package.
   3. "Ab" prices per service and per package.
   4. Preparing leased cars for return: offered, and what it includes (two reviews mention it).
   5. Pick-up and delivery; replacement car.
   6. Coating and product brands, and what "bis zu 5 Jahre" depends on.
   7. Aftercare: when may the car be washed after a coating?
   8. Other vehicles: camper vans, motorbikes, classic cars, boats.
   9. Business and fleet customers.
   10. Payment methods and gift vouchers.
   11. Arrival and parking (ferry, Airbus plant as landmarks).
   12. May the car makes in the studio photos be named?
6. **Facebook and YouTube.** Today:
   - the Facebook page "ElbCar Detailing" is set up as a "Digital Creator" profile with the intro "parlack1992";
   - Google labels its posts "Wilhelmsburg (Hamburg)", and one post uses older price categories;
   - YouTube @ElbCar has no description and no website link.

   Once Ahmet confirms which profiles are official:
   - Facebook becomes a business page in an automotive category, with address, phone, website, "Nur mit Termin" and no hours;
   - YouTube gets the website link and a one-line description with the address;
   - both are added to the structured data `sameAs` and to the Business Profile's social links.
7. **Former name Parlack (confirmed 2026-10-18).** Done on the website. Still to do: rename old Parlack profiles (e.g. the Facebook intro "parlack1992") to ElbCar Detailing with the current address instead of deleting them. Never edit the review texts.

## 6. Strategy options and recommendation

### A. English and Turkish pages (`/en/`, `/tr/`)

**Today.** English and Turkish exist only through the language buttons on the German address.

- The `?lang=` addresses point Google to the German page (canonical tag).
- There are no hreflang tags, and the buttons are not links.
- So only German can rank, and shared links always preview in German.

Google recommends one address per language with its own canonical, and calls language parameters like `?lang=` "not recommended".

**Possible audience.** About 101,000 Hamburg residents have a Turkish migration background, and in Finkenwerder/Waltershof Türkei is the most common reference country (31 %), according to Statistikamt Nord (31.12.2025). Search demand is unknown.

Options:

1. **Keep the language buttons only** (today). No work; English and Turkish stay a convenience for visitors.
2. **Static `/en/` and `/tr/` pages generated from the dictionary**, with hreflang de/en/tr and x-default → `/`. Recommended **if the go rule below is met**; about 1.5–2.5 days. A prototype generator already worked. The work includes:
   - a page-language lock in `main.js` (otherwise Googlebot would see `/en/` translated back into German);
   - forwarding old `?lang=` links;
   - adding both addresses to the sitemap;
   - a check-only CI workflow (no automatic commits, because pushes made with `GITHUB_TOKEN` do not start a Pages build);
   - a native-speaker review first.
3. **Jekyll templates:** 2–4 days, higher risk.
4. **Indexable `?lang=` addresses:** not recommended.

**Go rule:** build the pages if English or Turkish searches show regular impressions (about 50 or more per month), or if Ahmet serves Turkish- or English-speaking customers every week.

**Demand check:**

- In Search Console, filter the queries with the regex `(?i)(^|\s)(car|ceramic|coating|valet|cleaning|polish|oto|araç|arac|kuaför|kuafor|seramik|kaplama|pasta|cila|temizlik|yıkama)(\s|$)`.
- Check the Business Profile search terms.
- Ask Ahmet what share of enquiries comes in Turkish or English.

Until then, don't put `?lang=` links in bios.

### B. Service pages

Every result that ranks for "Keramikversiegelung / Lackkorrektur / Innenreinigung Hamburg" is a page of its own with "[Service] Hamburg" in the title, H1 and address. Maps reach drops sharply with distance: #1 in Finkenwerder, #14–33 in Hamburg-Mitte.

**Recommendation:** build three pages, but **only after the questionnaire answers** (section 5); pages made from today's one or two sentences would be thin.

- `/keramikversiegelung-hamburg`
- `/lackkorrektur-hamburg` (Lackaufbereitung & Polieren)
- `/innenreinigung-hamburg`

Each page gets:

- a title like "Keramikversiegelung Hamburg-Finkenwerder | ElbCar Detailing" and an H1 like "Keramikversiegelung in Hamburg";
- 500–900 words from Ahmet's facts;
- his own before/after photos and the matching review, quoted word for word;
- 3–5 FAQs, the address and "Nur mit Termin";
- a link from the service on the homepage (e.g. "Mehr zur Keramikversiegelung"), and links back to the packages and the form;
- a sitemap entry, and optionally `Service` structured data with `"provider": {"@id": "https://www.elbcar-detailing.de/#business"}`.

Decide whether the pages are German-only. Never build district pages (Altona, Harburg …): they would be doorway pages, and the service area is "Hamburg und Umgebung".

### C. Hosting

See `docs/hosting.md`. GitHub Pages caches files for only 10 minutes and allows no custom headers and no server-side redirects. Lighthouse flags 13 files, about 405 KiB, that returning visitors download again. That alone is no reason to move.

If the site moves, for SEO:

- keep https://www.elbcar-detailing.de/ and every address identical;
- add 301 redirects from `/index.html` to `/`, and from `/impressum` and `/datenschutz` to the `.html` versions;
- give images and fonts long caching only together with versioned file names;
- check `robots.txt`, the sitemap and the canonical tags again, and submit the sitemap again.

### D. Optional extras (later; owner's taste or small gain)

a) **Package line per service.** One line per service saying which package includes it (e.g. Keramikversiegelung "Im Exklusiv-Paket enthalten"). It changes the look of the list.

b) **More FAQs from existing facts:** "Was ist der Unterschied zwischen Premium und Exklusiv?" and "Was gehört zur Innenreinigung?".

c) **About headings.** Move "Ihr Experte für Fahrzeugaufbereitung in Hamburg" into the H2 and the slogan into the subtitle (Ahmet's copy call).

d) **Packages heading with the price** ("Richtpreise für die Autoaufbereitung – ab 150 €"). It would repeat "Richtpreise" right above the price list title.

e) **Heading markup.** Reviewer names as text instead of H3 headings (needs an accessibility check); the wording of the "Nichts dabei?" H3; the chapter numbers inside the H2s.

f) **Speed.**
   - Batch the layout reads of the start-up code (`initNavbar`, `updateReviewClamps`, `initSnapRows`, `initGalleryMore`) into one `requestAnimationFrame`.
   - Limit `text-wrap: balance/pretty` and `hyphens: auto` to short headings.

   Since SEO-09, the biggest remaining cost at start-up is the full layout forced by `initNavbar` reading `window.scrollY`: about 130–160 ms with a 4× slower CPU. Both changes affect timing or line breaks and must be measured again.

g) **German image file names** at the next re-export (e.g. `motorwaesche-mercedes-vorher-800.webp`). Renaming changes image addresses that are already indexed.

h) **og-cover.** On the next edit, put the logo inside the central square (x 285–915) and save under a new file name. Then update `og:image` and the structured-data image, and refresh the previews.

i) **Lightbox image.** The empty lightbox `<img src="">` is the only W3C error. Creating that image in JavaScript would fix it; there is no SEO effect.

### E. Decided against

- **FAQPage, Review and AggregateRating structured data.** The audit found that Google no longer shows FAQ rich results for any site (removed on 7 May 2026). Ratings about one's own business are not eligible for review stars, and the reviews shown are third-party Google reviews. Google reads the visible FAQ without markup.
- **Opening hours anywhere** (text, structured data, profiles). The business works by appointment only. Never add `openingHours` or `openingHoursSpecification`.
- **A 192×192 favicon.** The 180×180 apple-touch-icon and the 48×48 icon already meet Google's rules. The old logo in Google's results is a recrawl delay, not a size problem.
- **`noindex` on Impressum and Datenschutz.** These pages confirm the owner's identity and address.
- **`alternateName` "ElbCar".** It collides with Elbcar KFZ-Meisterwerkstatt; the former name "Fahrzeugaufbereitung Parlack" is used instead.
- **Wikidata `sameAs` for the area.** The address is already unambiguous, and the IDs were not verified.
- **District pages.** They would be doorway pages and go beyond "Hamburg und Umgebung".
- **Indexable `?lang=` addresses with canonical and hreflang set by JavaScript.** Google calls parameter-based language addresses not recommended.
- **Switching the 6 visible Maps links to the CID address.** They already carry the place ID and open the right listing.
- **Removing `<priority>` from the sitemap.** It has no effect.
- **Prices or durations per service.** Not without Ahmet's facts.

## 7. How to check SEO after future changes

### Every time text changes

1. **Change German text in both places.** Since 2026-10-18 the German page shows `index.html` exactly as it is. The German dictionary (`translations.de` in `js/main.js`) is used only when someone switches back to German from another language. So:
   - change both files together;
   - in the HTML, write `&nbsp;` wherever the dictionary has `\u00a0`.
2. **Run the sync check.**
   1. Run `python -m http.server 8000` in the repository folder and open http://localhost:8000/?lang=de.
   2. Press F12, open the Console, paste the snippet below and press Enter.
   3. Expected result: `OK: static German HTML matches translations.de`.

   The check also reports keys missing in English or Turkish, and WhatsApp links whose message differs from the dictionary.

   ```js
   (async () => { const doc = new DOMParser().parseFromString(await (await fetch(location.pathname, { cache: 'no-store' })).text(), 'text/html'); const de = translations.de; const bad = []; doc.querySelectorAll('[data-i18n]').forEach(el => { const k = el.getAttribute('data-i18n'); const v = /^(INPUT|TEXTAREA)$/.test(el.tagName) ? el.getAttribute('placeholder') : el.textContent; if (de[k] === undefined || v !== de[k]) bad.push(k); }); [['data-i18n-alt','alt'],['data-i18n-aria','aria-label'],['data-i18n-title','title'],['data-i18n-content','content']].forEach(([d, a]) => doc.querySelectorAll('[' + d + ']').forEach(el => { const k = el.getAttribute(d); if (de[k] === undefined || el.getAttribute(a) !== de[k]) bad.push(k + ' (' + a + ')'); })); doc.querySelectorAll('a[href^="https://wa.me/"]').forEach(a => { const m = (a.dataset.waKey && de[a.dataset.waKey]) || de.wa_greeting; if (a.getAttribute('href') !== a.getAttribute('href').split('?')[0] + '?text=' + encodeURIComponent(m)) bad.push('WhatsApp link ' + (a.dataset.waKey || 'wa_greeting')); }); ['en', 'tr'].forEach(l => Object.keys(de).forEach(k => { if (translations[l][k] === undefined) bad.push(k + ' missing in ' + l); })); console.log(bad.length ? 'Not in sync with translations.de: ' + bad.join(', ') : 'OK: static German HTML matches translations.de'); })();
   ```

3. **Use only confirmed facts.** Allowed:
   - the business data;
   - the 8 services with their descriptions and the packages with their feature lists;
   - the guide prices (ab 150/200/250/300 € by vehicle size; the final price depends on condition, effort and package);
   - free consultation, non-binding quote, a reply usually within one working day;
   - "Egal ob Kleinwagen oder Supersportwagen" and "jahrelange Erfahrung";
   - the former name Parlack;
   - review texts, word for word.

   Not allowed without Ahmet's facts: claims about durations, pick-up, payment, guarantees, awards, staff, a service area beyond "Hamburg und Umgebung", or other prices.
4. **No opening hours.** In Git Bash, this must print nothing ("Keine festen Öffnungszeiten" is fine):

   ```sh
   grep -n -i -E 'openingHours|[0-9]{1,2}(:[0-9]{2})? ?(-|–|bis) ?[0-9]{1,2}(:[0-9]{2})? ?Uhr|[0-9]{1,2}:[0-9]{2} ?Uhr' index.html impressum.html datenschutz.html 404.html js/main.js
   ```

### Before a merge (local server running)

- **Lighthouse in German, phone.** Add `--preset=desktop` for desktop; the report is written next to the repository folder.

  ```sh
  CHROME_PATH="C:/Program Files/Google/Chrome/Application/chrome.exe" npx -y lighthouse@12 http://localhost:8000/ --chrome-flags="--headless=new --lang=de-DE" --only-categories=performance,seo,accessibility,best-practices --output=html --output-path=../lh-phone.html
  ```

  Expected: SEO, Accessibility and Best Practices 100. Compare performance only with German runs made the same way: the local server does not compress files, so LCP is higher than on the live site.
- **Googlebot view.** In Chrome DevTools: ⋮ → More tools → Network conditions → untick "Use browser default" → "Googlebot Smartphone", then reload. Expected: German title, the H1 "Premium Autoaufbereitung in Hamburg", and the canonical `https://www.elbcar-detailing.de/`.
- **Snippet length** (Console):

  ```js
  (() => { const c = document.createElement('canvas').getContext('2d'); c.font = '20px Arial'; const t = Math.round(c.measureText(document.title).width); c.font = '14px Arial'; const d = Math.round(c.measureText(document.querySelector('meta[name=description]').content).width); console.log('Title ' + t + ' px (keep under about 580) | Description ' + d + ' px (keep under about 920)'); })();
  ```

- **Structured data parses** (Git Bash, in the repository folder):

  ```sh
  python -X utf8 -c "import json,re; h=open('index.html',encoding='utf-8').read(); bs=re.findall(r'<script type=\"application/ld\+json\">(.*?)</script>',h,re.S); print('JSON-LD OK:', [[n['@type'] for n in json.loads(b)['@graph']] for b in bs])"
  ```

  After the deploy, Ahmet can paste the address into Google's Rich Results Test (search.google.com/test/rich-results) in his browser. Expected: "Local business", 0 errors.
- **Sitemap parses:** `python -X utf8 -c "import xml.dom.minidom as m; m.parse('sitemap.xml'); print('sitemap OK')"`. Change `<lastmod>` only when a page's main content changes, and use the date it goes live.
- **Links:** `grep -n 'href="index.html' *.html` prints nothing. Internal links use `./` or `./#section`.
- **No requests to other hosts before a click.** In DevTools → Network, reload and scroll: only requests to the site itself. Google Maps loads only after a click on the map.
- **Headings fit** at 320, 390 and 1280 px (DevTools device toolbar): no horizontal scrolling and no word cut in the middle.

### After the deploy

- Open the page source of https://www.elbcar-detailing.de/ (Ctrl+U): check the new title, description and H1.
- Search Console → URL-Prüfung → Live-Test → "Indexierung beantragen" for every changed page.
- Rich Results Test (Ahmet, in his browser).
- Facebook Sharing Debugger whenever the Open Graph tags change.
- Check the rankings again after 4–6 weeks and add them to the log.

### Monthly

- Search Console: queries and pages. Searches at positions 11–20 are the easiest to improve.
- The review count on Google compared with the website.
- A Maps spot check for the seven searches in section 1.5 (map centred on Finkenwerder and on Hamburg-Mitte).
- All profiles still without opening hours.
- The date and the numbers in the log.

## Log

| Date | What | Numbers |
|---|---|---|
| 2026-10-18 | Four audits; SEO changes on branch `seo/optimize`; local verification | Sections 1 and 2 |
