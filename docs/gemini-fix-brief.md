# ElbCar Detailing implementation brief for Gemini

Date: 21 October 2026. Reviewed revision: `b85d888`.

Gemini is the implementing developer. Complete the six tasks below in priority order, keeping the existing static HTML, CSS and vanilla JavaScript architecture. The first priority is making language selection immediately accessible on mobile. The other substantive fixes concern recovery when JavaScript fails and collecting usable contact details.

This brief comes from a source audit and focused automated checks. A browser connection was unavailable, so the viewport and real-device checks below are acceptance requirements, not completed tests. Source line numbers refer to the reviewed revision; locate the named selectors/functions if lines have moved.

## Implementation boundaries

- Keep the existing visual identity, photography, German-first content and DE/EN/TR support. A framework migration or broad redesign is unnecessary.
- Follow the current decisions in `docs/seo.md`, `docs/gallery.md` and `docs/hosting.md`. Some entries in `TODO.md` are obsolete.
- Preserve business facts, agreed prices, phone number, address, appointment-only wording, Formspree endpoint and consent-based map loading.
- Keep German HTML and `translations.de` synchronized. Add every new visible or accessible string in all three languages.
- Implement and verify locally. Return a reviewable diff and test results; deployment is outside this implementation brief.

## Task 1 Make mobile language selection visible

Priority: P1, user-requested usability fix.

Evidence: `index.html:132–136` places the header language controls inside `#navMenu`, after seven navigation links, two contact buttons and the appointment notice. `css/style.css:227–264` hides that panel below 1100px. Visitors must discover and open the menu, and on short screens scroll through it, before choosing a language. A second selector exists in the footer (`index.html:863–867`), but reaching it requires scrolling to the end of the page.

### Design decision

Below 1100px, use this fixed header arrangement:

`[Logo]                         [globe DE v] [Menu]`

The language control must remain visible at the top of the page and while scrolling. Replace the duplicate mobile header WhatsApp icon with this control to keep the header uncluttered. Keep the existing WhatsApp buttons in the hero, navigation panel and mobile action bar. Preserve desktop navigation and its direct language buttons at 1100px and above.

The compact control shows the current language code and opens a small picker with **Deutsch**, **English**, and **Türkçe**, each written in its own language. Use a globe icon, not country flags. A visitor must be able to change language with at most two taps, without opening the navigation menu or scrolling.

### Implementation

- Put the mobile control outside the hidden `.nav-menu` subtree. Reuse `setLanguage()` and the existing translation dictionaries.
- Keep one source of truth for language state. Update the mobile trigger, selected option, desktop buttons and `document.documentElement.lang` together, including initial browser-language detection.
- Preserve precedence: valid `?lang=` parameter, saved explicit choice, supported browser language, then German. Preserve guarded localStorage access. An explicit selection must still update an existing `?lang=` parameter without losing the hash or other parameters.
- Give the trigger an accessible name, expanded state and association with the picker. Options need clear selected state, native language names and appropriate `lang` attributes. Use ordinary buttons in a labelled disclosure; do not introduce ARIA menu roles without implementing their full keyboard behavior.
- Provide at least 44 by 44 CSS pixel touch targets for the trigger and choices. This is the chosen usability target, consistent with [W3C enhanced target-size guidance](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html).
- Support keyboard activation, visible focus, Escape, outside-click dismissal and predictable focus return after selecting or dismissing. Keep the two header panels coordinated: opening the language picker closes the navigation panel and vice versa, without leaving scroll locks or conflicting focus traps.
- Preserve scroll position, form values, selected services/package and expanded FAQ content when switching language.
- Keep the legal pages German with their existing `data-lang-lock`; do not make a language control imply those pages have translations.

### Acceptance

- At 320, 360, 390, 430, 768, 1024 and 1099 CSS pixels wide, the language trigger is visible with navigation closed, both at the hero and farther down the page.
- No overlap or horizontal page overflow in DE/EN/TR; test a short landscape viewport and text enlargement too.
- At 1100 and 1440px, the desktop selector works and no duplicate mobile control is visible or focusable.
- All three languages can be selected; reload retains an explicit choice, including when starting at `?lang=en#contact` and switching to Turkish.
- Blocked localStorage does not break switching. Escape, selection, panel switching and resizing restore normal scrolling and sensible focus.

## Task 2 Keep content and navigation usable when enhancement fails

Priority: P2, confirmed failure-path defects.

Evidence:

- `index.html:6` adds `.js` before the external script has loaded. `css/style.css:347–348` then makes `.fade-in` sections transparent. If `js/main.js` fails to load, those sections stay invisible under ordinary motion settings.
- `css/style.css:474` also hides additional gallery items based on the same premature `.js` marker.
- `initScrollAnimations()` at `js/main.js:1190` creates `IntersectionObserver` without a capability guard. It runs before the contact, map, booking and gallery initializers. A focused runtime test with that API absent confirmed an exception stops the rest of that initialization sequence.
- Mobile navigation is hidden unconditionally by `css/style.css:227`; only JavaScript opens it. There is no usable mobile navigation fallback on the homepage or either legal page when JavaScript is disabled or unavailable.

### Implementation

- Make content visible by default. Enable hiding or collapsing only after the responsible feature successfully initializes, using feature-specific readiness state rather than the early global `.js` marker.
- The simplest reliable option is to remove scroll-reveal hiding. If retaining it, check support, initialize the observer first and guarantee affected content remains visible when initialization fails. Cosmetic animation must not block contact-form initialization.
- Gate gallery collapsing on successful installation of its reveal control. All gallery pairs must be available if that enhancement fails.
- Provide a compact, in-flow mobile navigation fallback, or a native disclosure that works without JavaScript. Hide an otherwise inert hamburger until its handler is ready. Include `impressum.html` and `datenschutz.html`, which do not have the homepage's early `.js` class.
- Keep native form submission and validation as the fallback. Do not disable the form merely because an unrelated enhancement is unavailable.

### Acceptance

Test each scenario separately: JavaScript disabled; only `js/main.js` blocked while the inline head script still runs; and `IntersectionObserver` unavailable before page scripts run. Check ordinary and reduced-motion settings.

The services, packages, gallery, FAQ and contact content must remain visible; mobile navigation must be usable; the form must remain available. With JavaScript enabled but the observer unavailable, the contact handler must still initialize. Test a simulated cosmetic initializer failure as well. Verify fallback layout does not overlap content on all three pages with navigation.

## Task 3 Make the requested reply channel actionable

Priority: P2, confirmed form-data gap and a narrow custom-validation issue.

Evidence: `index.html:714` makes phone optional, while `:751–753` offers callback, WhatsApp and Telegram. `js/main.js:1461–1478` does not validate contact information against the requested channel. Simulated submissions confirmed a callback or WhatsApp request is accepted without a number. Email remains available, but the business cannot use the visitor's requested channel.

The form already uses native browser validation for ordinary missing name/email and malformed email. Preserve that behavior. The additional JavaScript check rejects a whitespace-only name but only highlights and scrolls to the field (`js/main.js:1464–1466`, `1487–1491`); it supplies neither focus nor a field-specific error association.

### Implementation

- Preserve name and email as the normal minimum. Default/email enquiries must remain possible without a phone number.
- Expose callback/WhatsApp preferences only after their conditional validation has initialized successfully. Without that enhancement, keep a clearly labelled email-response form available; do not offer a channel whose required details the fallback cannot enforce.
- Selecting callback or WhatsApp conditionally requires a phone number. Explain why next to the field and update its required state and label. Switching back to email removes this condition.
- Keep phone validation permissive enough for international numbers, spaces and common punctuation. A complex locale-specific regular expression is unnecessary.
- Remove Telegram from the preference choices for this pass: the current form has no Telegram identifier field. If there is a newer, explicit owner requirement to retain Telegram, add a usable identifier field and validate it instead; do not leave an unreachable channel selectable.
- For custom errors, show a translated message beside the relevant field, associate it using `aria-describedby`, set `aria-invalid`, and focus the first invalid field. Clear stale error state when corrected or reset. Whitespace-only names need a specific name error. Preserve any existing description IDs when adding an error association. Error text should identify the affected field, consistent with [W3C error-identification guidance](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html).
- Preserve entered values, service selections and package tags on validation/network/server failure. Preserve the existing successful reset, timeout and submit-button recovery behavior. Reset conditional requiredness after successful submission too.

### Acceptance

Use mocked Formspree responses, not live customer enquiries:

1. Name plus valid email succeeds with default/email preference and no phone.
2. Callback/WhatsApp without a number is blocked with an understandable, accessible error at the phone field.
3. Supplying a number allows the corresponding request; changing back to email removes the phone requirement.
4. A whitespace-only name is rejected, named in the error, and focused. Ordinary missing fields and malformed email continue to receive native validation.
5. Successful submission resets values, package tag, errors and conditional requirements. HTTP failure, network rejection and timeout preserve input and restore the submit button.
6. The complete flow works in DE/EN/TR, including changing language after an error or after selecting a package.
7. With JavaScript disabled or blocked, the email-response form remains usable and unsupported channel preferences are absent.

## Task 4 Avoid duplicate hero preloads at square viewports

Priority: P3, small confirmed performance defect.

`index.html:98–99` uses inclusive `min-aspect-ratio: 1/1` for one preload and inclusive `max-aspect-ratio: 1/1` for the other. At 800 by 800 CSS pixels, both match, while the picture source at `:153` selects the mobile image.

Make the preload media conditions mutually exclusive and consistent with the picture's source-selection logic. Preserve responsive `imagesrcset`, `imagesizes` and high priority for the image actually displayed. In the browser network panel with cache disabled, verify square, portrait, landscape and short-height cases load only the selected hero variant; check both relevant device pixel ratios. Do not change image assets without a measured need.

## Task 5 Remove the empty lightbox image source

Priority: P3, existing known HTML cleanup.

`index.html:882` contains an empty `src`, and `js/main.js:1157` assigns an empty string again on close. This is already recorded in `docs/seo.md:512`.

Remove the static empty image and create it when first needed, assigning a valid source and descriptive alternative text before attaching and showing it. On close, either remove the image or retain its last valid source while hidden. Update the lightbox's image reference accordingly. Do not merely leave an image without both `src` and `srcset`; the [HTML Standard](https://html.spec.whatwg.org/multipage/embedded-content.html#the-img-element) requires at least one. Verify opening, previous/next, closing and reopening work, including keyboard focus return, with no invalid source and no broken-image flash.

## Task 6 Reconcile the backlog with the current site

Priority: P3, prevents repeated or conflicting implementation work.

`TODO.md` still asks for items already implemented, including an FAQ, social proof near the hero, structured data/canonical consistency, and WebP/lazy-loading work. It also suggests district landing pages despite the newer decision against that approach in `docs/seo.md`.

Mark completed implementation accurately, retain measurement work that remains useful, and remove or annotate superseded recommendations. Do not mark owner/account work complete without evidence. Link this brief from the backlog and record which tasks were actually implemented and verified.

One separate content improvement can remain in the backlog: the guide-price categories at `index.html:303–306` differ from the enquiry-size choices at `:738–741` (for example, Golf is grouped under Klein in the form). Align the terminology once the intended mapping is clear; do not infer a new price classification for vehicle types.

## Verification and handoff

The existing site passed these audit checks: JavaScript syntax; local file and fragment references; duplicate IDs and label/ARIA references; JSON-LD and sitemap parsing; image dimensions and srcset widths; translation-key coverage; German HTML/dictionary consistency. Each language has 274 dictionary keys, and all 319 static German translation bindings matched. Mocked form success and failure behavior passed apart from the gaps identified above. Preserve these strengths.

After implementation:

- Run `node --check js/main.js` and repeat translation consistency, link/ID and asset checks.
- Run meaningful regression checks for language persistence, conditional form validation, network failure and failed enhancement. Keep tests proportionate; a production dependency or build-system migration is unnecessary.
- Complete the viewport checks above, plus actual iOS Safari and Android Chrome checks where available. Check keyboard navigation and an available screen reader for the language picker and custom errors. Explicitly report any unavailable test environment.
- Use local preview via `python -m http.server 8000`. Check homepage, Impressum, Datenschutz and the 404 page. Do not send real Formspree submissions, WhatsApp messages or calls as part of automated verification.
- Capture before/after mobile screenshots for the header at 320px and 390px, the open language picker, and the conditional phone error. Report exact browser/viewport settings and actual outcomes; historical Lighthouse scores in `docs/seo.md` are not results for this change.
- Return changed files, a concise explanation of each completed task, verification results and any remaining issue. Keep new documentation under `docs`, which is excluded from the published site by `_config.yml`.
