# Gemini implementation review and follow-up

Reviewed on 21 October 2026 against the working-tree changes based on `b85d888` and `docs/gemini-fix-brief.md`.

The main implementation follows the architectural brief. The supplied mobile screenshots show the language picker prominently in the header. Source review supports language synchronization, independent panel controls, usable navigation without JavaScript, visible content by default, conditional phone requirements, gallery readiness gating, mutually exclusive hero preloads and the dynamic lightbox image.

Two small corrections remain, followed by a verification-report cleanup. Gemini should implement these locally and return the diff and reproducible results. Keep the current design and static architecture.

## 1 Preserve focus across the language-control breakpoint

Priority: P2. Source: `js/main.js:1097–1100`, `css/style.css:273`.

The language picker's breakpoint handler closes it with `setOpen(false, false)` at 1100px. If a keyboard user has focused an option, the picker and its focused control disappear without transferring focus to a visible control. The closed trigger can also be focused when the whole dropdown disappears.

Reproduce: at 1099px, open the picker with the keyboard and focus a language option; resize or rotate to at least 1100px. An in-memory test of the actual initializer confirmed the picker closes without another focus call. The browser's resulting fallback focus position was not tested independently.

Before hiding the mobile control, detect whether it contains `document.activeElement`. If so, move focus to the corresponding visible desktop language button within the header, using `preventScroll`. When the trigger had focus, use the currently selected language. Do not change the selected language merely because the viewport changes. Handle a focused desktop language button disappearing in the reverse direction by returning focus to the mobile trigger. Avoid moving focus when it was elsewhere on the page.

Acceptance:

- Test 1099 to 1100px with focus on an option, on the closed trigger, and elsewhere on the page.
- Test 1100 to 1099px with focus on a desktop language button.
- After each transition, the focused control is visible, keyboard navigation continues predictably, language choice stays unchanged and scrolling remains unlocked.

## 2 Distinguish missing phone numbers from malformed optional numbers

Priority: P3. Source: `js/main.js:1667–1669`, `1696–1700`, and the `form_error_phone` translations at `283`, `577` and `870`.

Reproduce: provide a name and valid email, select callback, enter `123` as the phone number and submit. Then switch the reply preference to email. Requiredness correctly clears, but the error remains; submitting still shows a message asking for a phone number for callback or WhatsApp.

Validating a nonempty optional number is reasonable. The defect is the misleading explanation after email is selected, and using the same missing-number message for malformed numbers. This behavior was reproduced with the actual form initializer and mocked DOM/fetch; no real enquiry was sent.

Separate missing-required and malformed-number errors in DE/EN/TR. Keep phone optional for email replies. For a malformed optional number, explain that the visitor can correct it or clear it to receive an email response. Re-evaluate an existing phone error when the channel changes so its message and ARIA associations remain accurate. Keep user input and existing unrelated description IDs intact.

Acceptance:

- Default/email with no phone succeeds.
- Callback/WhatsApp without a phone shows the required-number error.
- A malformed nonempty number shows a format/correction error, not a request for a number that is already present.
- Switching to email removes requiredness and refreshes any remaining optional-number error; clearing the phone permits submission.
- Switching language while the error is visible updates its explanation. Success/reset and mocked network failures retain their existing behavior.

## 3 Make the handoff match the delivered files and evidence

The pasted report is not an exact description of the current files:

- It lists six screenshots, including two before images. Only four after images are present in `docs/screenshots/`. Supply the two baseline captures from the reviewed baseline, or correct the delivered-artifact list.
- It describes `.fade-in-init` and retained reveal animation. The current CSS makes content visible and removes that animation, which is permitted by the brief. Describe that actual decision.
- It refers to `nav_lang_label`, `.wa-float`, and field-error live-region attributes that do not exist in the current implementation. The actual trigger key is `aria_lang_current`; the mobile action bar uses `.mbar`. Field errors use focus and description associations, while the form-wide status is a live region. Correct the report rather than adding unnecessary code to match it.
- Its source line references do not match the delivered revision. Refresh them or refer to stable function names and selectors.
- The claimed 133 assertions have no retained test script or raw result in this repository. They may have run elsewhere, but this review cannot reproduce that count. Save the relevant harness, invocation and result, or narrow the claim to the tests for which evidence is available. Add focused regression coverage for the two cases above, with external submissions mocked.

Keep physical iOS Safari, Android Chrome and screen-reader testing explicitly marked unavailable unless they are actually performed. DOM/ARIA assertions are useful checks, but are not a substitute for testing with assistive technology. Update the completion note in `TODO.md` after the follow-ups are verified.

## Independent review results

- JavaScript syntax and `git diff --check` passed.
- DE/EN/TR contain 278 matching dictionary keys each; all 321 static German translation bindings match the German dictionary.
- IDs, label/ARIA references and local fragments passed across all four HTML pages.
- The 201 local HTML reference occurrences and CSS font references resolve. JSON-LD and sitemap parse; no empty image sources remain.
- Focused mocked-runtime tests reproduced the two issues above and confirmed the email-without-phone path and successful reset/button recovery.
- The supplied header, open-picker and phone-error screenshots were inspected. The independent review had no browser connection, so it does not certify the reported Chromium viewport/network tests or actual mobile/screen-reader behavior.

Only this follow-up document was added during review. Website implementation remains Gemini's work.
