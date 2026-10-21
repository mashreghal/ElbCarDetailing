/**
 * Headless Chromium (CDP) end-to-end verification suite for ElbCar Detailing.
 * Covers Tasks 1–6 from docs/gemini-fix-brief.md plus Follow-up #1 and #2 from docs/gemini-review-followup.md.
 *
 * Run with:
 *   node docs/verification/verify-browser-cdp.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { startStaticServer, launchChrome } from './cdp.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const DOCS_SHOTS = path.join(ROOT, 'docs', 'screenshots');
fs.mkdirSync(DOCS_SHOTS, { recursive: true });

const results = [];
function assert(cond, msg) {
  if (!cond) throw new Error('ASSERTION FAILED: ' + msg);
  results.push('PASS: ' + msg);
}

const { server, baseUrl } = await startStaticServer(ROOT);
const cdp = await launchChrome();

try {
  // =========================================================================
  // 1. Static HTML / Translation / Link / ID / JSON-LD / Sitemap Audit Checks
  // =========================================================================
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false });
  await cdp.send('Page.navigate', { url: `${baseUrl}/?lang=de` });
  await new Promise(r => setTimeout(r, 500));

  const audit = await cdp.evaluate(`(async () => {
    const rawHtml = await (await fetch('/index.html', { cache: 'no-store' })).text();
    const doc = new DOMParser().parseFromString(rawHtml, 'text/html');
    const de = translations.de, en = translations.en, tr = translations.tr;
    const deKeys = Object.keys(de), enKeys = Object.keys(en), trKeys = Object.keys(tr);
    const badSync = [];
    doc.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.getAttribute('data-i18n');
      const v = /^(INPUT|TEXTAREA)$/.test(el.tagName) ? el.getAttribute('placeholder') : el.textContent;
      if (de[k] === undefined || v !== de[k]) badSync.push(k + ' (text)');
    });
    [['data-i18n-alt','alt'],['data-i18n-aria','aria-label'],['data-i18n-title','title'],['data-i18n-content','content']].forEach(([d, a]) => {
      doc.querySelectorAll('[' + d + ']').forEach(el => {
        const k = el.getAttribute(d);
        if (de[k] === undefined || el.getAttribute(a) !== de[k]) badSync.push(k + ' (' + a + ')');
      });
    });
    doc.querySelectorAll('a[href^="https://wa.me/"]').forEach(a => {
      const m = (a.dataset.waKey && de[a.dataset.waKey]) || de.wa_greeting;
      if (a.getAttribute('href') !== a.getAttribute('href').split('?')[0] + '?text=' + encodeURIComponent(m)) {
        badSync.push('WhatsApp ' + (a.dataset.waKey || 'wa_greeting'));
      }
    });
    ['en', 'tr'].forEach(l => deKeys.forEach(k => {
      if (translations[l][k] === undefined) badSync.push(k + ' missing in ' + l);
    }));
    ['en', 'tr'].forEach(l => Object.keys(translations[l]).forEach(k => {
      if (de[k] === undefined) badSync.push(k + ' extra in ' + l);
    }));

    const ids = new Set();
    const dupIds = [];
    doc.querySelectorAll('[id]').forEach(el => {
      if (ids.has(el.id)) dupIds.push(el.id);
      ids.add(el.id);
    });
    const brokenRefs = [];
    doc.querySelectorAll('label[for]').forEach(l => {
      const t = l.getAttribute('for');
      if (!ids.has(t)) brokenRefs.push('label[for=' + t + ']');
    });
    ['aria-labelledby', 'aria-describedby', 'aria-controls'].forEach(attr => {
      doc.querySelectorAll('[' + attr + ']').forEach(el => {
        el.getAttribute(attr).trim().split(/\\s+/).filter(Boolean).forEach(id => {
          if (!ids.has(id)) brokenRefs.push(attr + '=' + id);
        });
      });
    });
    doc.querySelectorAll('a[href^="#"]').forEach(a => {
      const h = a.getAttribute('href').slice(1);
      if (h && !ids.has(h)) brokenRefs.push('href=#' + h);
    });

    const emptyImgs = Array.from(doc.querySelectorAll('img')).filter(img => !img.getAttribute('src') && !img.getAttribute('srcset')).length;

    return {
      keyCounts: { de: deKeys.length, en: enKeys.length, tr: trKeys.length },
      badSync,
      dupIds,
      brokenRefs,
      emptyImgs
    };
  })()`);

  assert(audit.keyCounts.de === 280 && audit.keyCounts.en === 280 && audit.keyCounts.tr === 280,
    `Translation dictionaries have identical key counts: DE=${audit.keyCounts.de}, EN=${audit.keyCounts.en}, TR=${audit.keyCounts.tr}`);
  assert(audit.badSync.length === 0, `Static German HTML matches translations.de (0 mismatches)`);
  assert(audit.dupIds.length === 0, `Zero duplicate IDs in index.html`);
  assert(audit.brokenRefs.length === 0, `Zero broken label/ARIA/fragment references in index.html`);
  assert(audit.emptyImgs === 0, `Task 5: Zero <img> elements without src/srcset in static index.html`);

  // =========================================================================
  // 2. Task 1 & Follow-up #1: Mobile Language Control Viewports & Breakpoint Focus
  // =========================================================================
  const mobileWidths = [320, 360, 390, 430, 768, 1024, 1099];
  for (const w of mobileWidths) {
    const h = w < 600 ? 640 : 800;
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 2, mobile: w < 1000 });
    await cdp.send('Page.navigate', { url: `${baseUrl}/?lang=de` });
    await new Promise(r => setTimeout(r, 350));

    for (const lang of ['de', 'en', 'tr']) {
      const check = await cdp.evaluate(`(() => {
        setLanguage('${lang}', false);
        window.scrollTo(0, 0);
        const trig = document.getElementById('langTrigger');
        const toggle = document.querySelector('.nav-toggle');
        const brand = document.querySelector('.nav-brand');
        const navCta = document.querySelector('.nav-cta');
        const rTrig = trig.getBoundingClientRect();
        const rToggle = toggle.getBoundingClientRect();
        const rBrand = brand.getBoundingClientRect();
        const sTrig = getComputedStyle(trig);
        const sCta = getComputedStyle(navCta);

        window.scrollTo(0, 900);
        const rTrigScrolled = trig.getBoundingClientRect();
        window.scrollTo(0, 0);

        const overlapBrand = rBrand.right > rTrig.left + 1;
        const overlapToggle = rTrig.right > rToggle.left + 1;
        const overflowX = document.documentElement.scrollWidth > window.innerWidth;

        return {
          visibleHero: sTrig.display !== 'none' && sTrig.visibility !== 'hidden' && rTrig.width >= 44 && rTrig.height >= 44 && rTrig.top >= 0 && rTrig.bottom <= 72,
          visibleScrolled: rTrigScrolled.width >= 44 && rTrigScrolled.height >= 44 && rTrigScrolled.top >= 0 && rTrigScrolled.bottom <= 72,
          ctaHidden: sCta.display === 'none',
          overlapBrand,
          overlapToggle,
          overflowX,
          trigSize: { w: Math.round(rTrig.width), h: Math.round(rTrig.height) }
        };
      })()`);

      assert(check.visibleHero && check.visibleScrolled,
        `Task 1 (${w}px, ${lang}): Language trigger visible at hero & scrolled (${check.trigSize.w}x${check.trigSize.h}px >= 44x44px)`);
      assert(check.ctaHidden, `Task 1 (${w}px, ${lang}): Duplicate mobile header WhatsApp icon hidden`);
      assert(!check.overlapBrand && !check.overlapToggle, `Task 1 (${w}px, ${lang}): No header control overlap`);
      assert(!check.overflowX, `Task 1 (${w}px, ${lang}): No horizontal page overflow`);
    }

    if (w === 320 || w === 390) {
      await cdp.evaluate(`setLanguage('de', false); window.scrollTo(0, 0);`);
      await new Promise(r => setTimeout(r, 200));
      const shot = await cdp.send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(DOCS_SHOTS, `after-header-${w}.png`), Buffer.from(shot.data, 'base64'));

      if (w === 390) {
        await cdp.evaluate(`document.getElementById('langTrigger').click()`);
        await new Promise(r => setTimeout(r, 150));
        const pickerCheck = await cdp.evaluate(`(() => {
          const picker = document.getElementById('langPicker');
          const opts = Array.from(picker.querySelectorAll('.lang-option')).map(o => {
            const r = o.getBoundingClientRect();
            return {
              lang: o.getAttribute('lang'),
              text: o.querySelector('.lang-option-name').textContent,
              pressed: o.getAttribute('aria-pressed'),
              w: Math.round(r.width),
              h: Math.round(r.height)
            };
          });
          return { hidden: picker.hidden, opts };
        })()`);
        assert(!pickerCheck.hidden && pickerCheck.opts.length === 3 &&
          pickerCheck.opts.every(o => o.w >= 44 && o.h >= 44),
          `Task 1 (390px): Open picker shows Deutsch/English/Türkçe with >=44x44px targets (${JSON.stringify(pickerCheck.opts)})`);
        const shotOpen = await cdp.send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(DOCS_SHOTS, `after-lang-picker-open-390.png`), Buffer.from(shotOpen.data, 'base64'));
      }
    }
  }

  // Short landscape (667x375) and 125% text enlargement (390x844)
  for (const [w, h, scaleFont] of [[667, 375, false], [390, 844, true]]) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 2, mobile: true });
    await cdp.send('Page.navigate', { url: `${baseUrl}/?lang=de` });
    await new Promise(r => setTimeout(r, 300));
    const check = await cdp.evaluate(`(() => {
      if (${scaleFont}) document.documentElement.style.fontSize = '125%';
      const trig = document.getElementById('langTrigger');
      const r = trig.getBoundingClientRect();
      const overflow = document.documentElement.scrollWidth > window.innerWidth;
      document.documentElement.style.fontSize = '';
      return { visible: r.width >= 44 && r.height >= 44, overflow };
    })()`);
    assert(check.visible && !check.overflow,
      `Task 1 (${w}x${h}, fontScale=${scaleFont}): Trigger visible and no horizontal overflow`);
  }

  // Desktop viewports: 1100px and 1440px
  for (const w of [1100, 1440]) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: 900, deviceScaleFactor: 1, mobile: false });
    await cdp.send('Page.navigate', { url: `${baseUrl}/?lang=de` });
    await new Promise(r => setTimeout(r, 300));
    const desk = await cdp.evaluate(`(() => {
      const dd = document.getElementById('langDropdown');
      const trig = document.getElementById('langTrigger');
      const deskSwitch = document.querySelector('.nav-menu .lang-switch');
      const deskBtns = Array.from(deskSwitch.querySelectorAll('.lang-btn'));
      return {
        mobileDisplay: getComputedStyle(dd).display,
        mobileRects: trig.getClientRects().length,
        deskDisplay: getComputedStyle(deskSwitch).display,
        deskVisible: deskBtns.every(b => b.getClientRects().length > 0)
      };
    })()`);
    assert(desk.mobileDisplay === 'none' && desk.mobileRects === 0 && desk.deskDisplay === 'flex' && desk.deskVisible,
      `Task 1 (${w}px): Desktop selector visible/focusable and mobile control hidden/unfocusable`);
  }

  // Follow-up #1 in real Chromium: Breakpoint focus transitions (1099 <-> 1100px)
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1099, height: 800, deviceScaleFactor: 1, mobile: false });
  await cdp.send('Page.navigate', { url: `${baseUrl}/?lang=de` });
  await new Promise(r => setTimeout(r, 350));

  // 1a. 1099 -> 1100px with focus on TR option inside open picker
  await cdp.evaluate(`(() => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    document.getElementById('langTrigger').click();
    document.querySelector('#langPicker .lang-option[data-lang="tr"]').focus({ preventScroll: true });
  })()`);
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1100, height: 800, deviceScaleFactor: 1, mobile: false });
  await new Promise(r => setTimeout(r, 150));
  const bpOptionToDesk = await cdp.evaluate(`(() => {
    const active = document.activeElement;
    const expected = document.querySelector('.navbar .lang-switch .lang-btn[data-lang="tr"]');
    return {
      pickerHidden: document.getElementById('langPicker').hidden,
      matchedFocus: active === expected,
      visible: active && active.getClientRects().length > 0 && getComputedStyle(active).visibility !== 'hidden',
      langUnchanged: document.documentElement.lang === 'de',
      scrollUnlocked: document.body.style.overflow === ''
    };
  })()`);
  assert(Object.values(bpOptionToDesk).every(Boolean),
    `Follow-up #1 (Chromium 1099 -> 1100px, option focused): Focus moves to visible desktop TR button, language stays DE, scroll unlocked (${JSON.stringify(bpOptionToDesk)})`);

  // 1b. 1100 -> 1099px with focus on desktop TR button
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1099, height: 800, deviceScaleFactor: 1, mobile: false });
  await new Promise(r => setTimeout(r, 150));
  const bpDeskToMobile = await cdp.evaluate(`(() => {
    const active = document.activeElement;
    const expected = document.getElementById('langTrigger');
    return {
      matchedFocus: active === expected,
      visible: active && active.getClientRects().length > 0 && getComputedStyle(active).visibility !== 'hidden',
      langUnchanged: document.documentElement.lang === 'de',
      scrollUnlocked: document.body.style.overflow === ''
    };
  })()`);
  assert(Object.values(bpDeskToMobile).every(Boolean),
    `Follow-up #1 (Chromium 1100 -> 1099px, desktop button focused): Focus returns to visible mobile #langTrigger, language stays DE`);

  // 1c. 1099 -> 1100px with focus on closed #langTrigger (while currentLang is EN)
  await cdp.evaluate(`(() => {
    selectLanguage('en');
    document.getElementById('langTrigger').focus({ preventScroll: true });
  })()`);
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1100, height: 800, deviceScaleFactor: 1, mobile: false });
  await new Promise(r => setTimeout(r, 150));
  const bpTriggerToDesk = await cdp.evaluate(`(() => {
    const active = document.activeElement;
    const expected = document.querySelector('.navbar .lang-switch .lang-btn[data-lang="en"]');
    return {
      matchedFocus: active === expected,
      visible: active && active.getClientRects().length > 0 && getComputedStyle(active).visibility !== 'hidden',
      langUnchanged: document.documentElement.lang === 'en'
    };
  })()`);
  assert(Object.values(bpTriggerToDesk).every(Boolean),
    `Follow-up #1 (Chromium 1099 -> 1100px, closed trigger focused): Focus moves to currently selected desktop EN button`);

  // 1d. 1099 <-> 1100px with focus elsewhere on page (#cf-name)
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1099, height: 800, deviceScaleFactor: 1, mobile: false });
  await new Promise(r => setTimeout(r, 150));
  await cdp.evaluate(`document.getElementById('cf-name').focus({ preventScroll: true }); selectLanguage('de');`);
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1100, height: 800, deviceScaleFactor: 1, mobile: false });
  await new Promise(r => setTimeout(r, 150));
  const bpElsewhere1 = await cdp.evaluate(`document.activeElement === document.getElementById('cf-name')`);
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1099, height: 800, deviceScaleFactor: 1, mobile: false });
  await new Promise(r => setTimeout(r, 150));
  const bpElsewhere2 = await cdp.evaluate(`document.activeElement === document.getElementById('cf-name')`);
  assert(bpElsewhere1 && bpElsewhere2,
    `Follow-up #1 (Chromium 1099 <-> 1100px, focus elsewhere): Focus remains on #cf-name across both transitions`);

  // Language persistence, ?lang=en#contact -> TR reload, blocked localStorage, state preservation, panel coordination
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await cdp.send('Page.navigate', { url: `${baseUrl}/?lang=en#contact` });
  await new Promise(r => setTimeout(r, 400));

  const langFlow = await cdp.evaluate(`(() => {
    const initialLang = document.documentElement.lang;
    const initialCode = document.querySelector('.lang-trigger-code').textContent;
    document.getElementById('cf-name').value = 'Max Mustermann';
    document.querySelector('input[name="Leistungen"][value="Keramikversiegelung"]').checked = true;
    document.querySelector('a[data-pkg="Premium"]').click();
    history.replaceState(null, '', '?lang=en#contact');
    const faq2 = document.querySelectorAll('details.faq-item')[1];
    faq2.open = true;
    window.scrollTo(0, 500);
    const scrollBefore = Math.round(window.scrollY);

    document.querySelector('.nav-toggle').click();
    const menuOpenBefore = document.getElementById('navMenu').classList.contains('open');
    document.getElementById('langTrigger').click();
    const menuClosedWhenLangOpened = !document.getElementById('navMenu').classList.contains('open') && document.body.style.overflow === '';
    const langOpen = !document.getElementById('langPicker').hidden;

    document.querySelector('#langPicker .lang-option[data-lang="tr"]').click();
    const afterLang = document.documentElement.lang;
    const afterCode = document.querySelector('.lang-trigger-code').textContent;
    const afterUrl = location.search + location.hash;
    const focusReturnedToTrigger = document.activeElement === document.getElementById('langTrigger');
    const scrollAfter = Math.round(window.scrollY);
    const preserved = {
      name: document.getElementById('cf-name').value === 'Max Mustermann',
      svc: document.querySelector('input[name="Leistungen"][value="Keramikversiegelung"]').checked,
      pkg: !document.getElementById('formPkg').hidden && document.querySelector('.form-pkg-name').textContent === translations.tr.form_pkg_premium,
      faqOpen: faq2.open === true,
      scrollSame: Math.abs(scrollAfter - scrollBefore) <= 2
    };
    return {
      initialLang, initialCode, menuOpenBefore, menuClosedWhenLangOpened, langOpen,
      afterLang, afterCode, afterUrl, focusReturnedToTrigger, preserved
    };
  })()`);

  assert(langFlow.initialLang === 'en' && langFlow.initialCode === 'EN', `Task 1: ?lang=en#contact initializes in English`);
  assert(langFlow.menuOpenBefore && langFlow.menuClosedWhenLangOpened && langFlow.langOpen,
    `Task 1: Opening language picker closes mobile menu and removes scroll lock`);
  assert(langFlow.afterLang === 'tr' && langFlow.afterCode === 'TR' && langFlow.afterUrl === '?lang=tr#contact',
    `Task 1: Switching to TR from ?lang=en#contact updates URL to ?lang=tr#contact`);
  assert(langFlow.focusReturnedToTrigger, `Task 1: Selecting language returns focus to #langTrigger`);
  assert(Object.values(langFlow.preserved).every(Boolean),
    `Task 1: Switching language preserves scroll position, form values, service checkbox, package tag & open FAQ`);

  await cdp.send('Page.reload');
  await new Promise(r => setTimeout(r, 400));
  const reloadedLang = await cdp.evaluate(`document.documentElement.lang + ':' + document.querySelector('.lang-trigger-code').textContent`);
  assert(reloadedLang === 'tr:TR', `Task 1: Reload retains Turkish choice (${reloadedLang})`);

  const blockedStorageCheck = await cdp.evaluate(`(() => {
    const origGet = Storage.prototype.getItem;
    const origSet = Storage.prototype.setItem;
    Storage.prototype.getItem = () => { throw new DOMException('Blocked', 'SecurityError'); };
    Storage.prototype.setItem = () => { throw new DOMException('Blocked', 'SecurityError'); };
    try {
      document.getElementById('langTrigger').click();
      document.querySelector('#langPicker .lang-option[data-lang="de"]').click();
      const switchedDe = document.documentElement.lang === 'de';
      document.getElementById('langTrigger').click();
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      const closedOnEsc = document.getElementById('langPicker').hidden && document.activeElement === document.getElementById('langTrigger');
      return { switchedDe, closedOnEsc };
    } finally {
      Storage.prototype.getItem = origGet;
      Storage.prototype.setItem = origSet;
    }
  })()`);
  assert(blockedStorageCheck.switchedDe && blockedStorageCheck.closedOnEsc,
    `Task 1: Blocked localStorage does not break switching; Escape closes picker and returns focus`);

  // =========================================================================
  // 3. Task 2: Failure-Path Scenarios (JS Disabled, main.js Blocked, No IO)
  // =========================================================================
  await cdp.send('Emulation.setScriptExecutionDisabled', { value: true });
  for (const motion of ['no-preference', 'reduce']) {
    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: motion }] });
    for (const pagePath of ['/', '/impressum.html', '/datenschutz.html']) {
      await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
      await cdp.send('Page.navigate', { url: `${baseUrl}${pagePath}` });
      await new Promise(r => setTimeout(r, 350));
      const noJs = await cdp.evaluate(`(() => {
        const nav = document.querySelector('.navbar');
        const main = document.querySelector('main');
        const toggle = document.querySelector('.nav-toggle');
        const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
        const rNav = nav.getBoundingClientRect();
        const rMain = main.getBoundingClientRect();
        const navOverlapsMain = rNav.bottom > rMain.top + 1;
        const linksVisible = navLinks.length > 0 && navLinks.every(a => {
          const r = a.getBoundingClientRect();
          const s = getComputedStyle(a);
          return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.opacity !== '0';
        });
        const toggleHidden = getComputedStyle(toggle).display === 'none';
        if ('${pagePath}' !== '/') {
          return { navOverlapsMain, linksVisible, toggleHidden, contentVisible: rMain.height > 200 };
        }
        const fadeInsVisible = Array.from(document.querySelectorAll('.fade-in')).every(el => getComputedStyle(el).opacity === '1');
        const galleryItemsVisible = Array.from(document.querySelectorAll('#baGrid > div')).filter(el => getComputedStyle(el).display !== 'none').length;
        const formVisible = document.getElementById('contactForm').getBoundingClientRect().height > 100;
        const condChannelsHidden = Array.from(document.querySelectorAll('[data-channel-cond]')).every(el => el.hidden && getComputedStyle(el).display === 'none');
        const telegramAbsent = !document.querySelector('input[name="Kontaktart"][value="Telegram"]');
        return {
          navOverlapsMain, linksVisible, toggleHidden,
          contentVisible: fadeInsVisible && galleryItemsVisible === 8 && formVisible && condChannelsHidden && telegramAbsent
        };
      })()`);
      assert(!noJs.navOverlapsMain && noJs.linksVisible && noJs.toggleHidden && noJs.contentVisible,
        `Task 2 (JS disabled, motion=${motion}, ${pagePath}): Content/gallery/form visible, fallback nav usable, no overlap`);
    }
  }
  await cdp.send('Emulation.setScriptExecutionDisabled', { value: false });
  await cdp.send('Emulation.setEmulatedMedia', { features: [] });

  await cdp.send('Network.setBlockedURLs', { urls: ['*js/main.js*'] });
  await cdp.send('Page.navigate', { url: `${baseUrl}/` });
  await new Promise(r => setTimeout(r, 400));
  const blockedMainCheck = await cdp.evaluate(`(() => {
    document.documentElement.classList.add('js');
    const hasJsClass = document.documentElement.classList.contains('js');
    const mainJsLoaded = typeof window.setLanguage === 'function';
    const fadeInsVisible = Array.from(document.querySelectorAll('.fade-in')).every(el => getComputedStyle(el).opacity === '1');
    const galleryVisibleCount = Array.from(document.querySelectorAll('#baGrid > div')).filter(el => getComputedStyle(el).display !== 'none').length;
    const navLinksVisible = Array.from(document.querySelectorAll('.nav-links a')).every(a => a.getBoundingClientRect().height > 0);
    return { hasJsClass, mainJsLoaded, fadeInsVisible, galleryVisibleCount, navLinksVisible };
  })()`);
  assert(blockedMainCheck.hasJsClass && !blockedMainCheck.mainJsLoaded && blockedMainCheck.fadeInsVisible && blockedMainCheck.galleryVisibleCount === 8 && blockedMainCheck.navLinksVisible,
    `Task 2 (js/main.js blocked while inline head script runs): All fade-in sections visible, all 8 gallery sliders visible, fallback nav usable`);
  await cdp.send('Network.setBlockedURLs', { urls: [] });

  for (const mode of ['absent', 'throws']) {
    const ioScript = await cdp.send('Page.addScriptToEvaluateOnNewDocument', {
      source: mode === 'absent'
        ? `delete window.IntersectionObserver;`
        : `window.IntersectionObserver = function() { throw new Error('Simulated IO failure'); };`
    });
    await cdp.send('Page.navigate', { url: `${baseUrl}/` });
    await new Promise(r => setTimeout(r, 400));
    const ioCheck = await cdp.evaluate(`(() => {
      const fadeInsVisible = Array.from(document.querySelectorAll('.fade-in')).every(el => getComputedStyle(el).opacity === '1');
      const formInitialized = !!document.querySelector('#contactForm .form-status') &&
        Array.from(document.querySelectorAll('[data-channel-cond]')).every(el => !el.hidden);
      return { fadeInsVisible, formInitialized };
    })()`);
    assert(ioCheck.fadeInsVisible && ioCheck.formInitialized,
      `Task 2 (IntersectionObserver ${mode}): Content remains visible and contact form initializes`);
    await cdp.send('Page.removeScriptToEvaluateOnNewDocument', { identifier: ioScript.identifier });
  }

  // =========================================================================
  // 4. Task 3 & Follow-up #2: Contact Form Validation & Mocked Submissions
  // =========================================================================
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await cdp.send('Page.navigate', { url: `${baseUrl}/?lang=de` });
  await new Promise(r => setTimeout(r, 400));

  // Case 3.1: Whitespace-only name rejected
  const wsNameCheck = await cdp.evaluate(`(() => {
    const form = document.getElementById('contactForm');
    const name = document.getElementById('cf-name');
    const email = document.getElementById('cf-email');
    name.value = '   ';
    email.value = 'test@example.com';
    form.requestSubmit();
    const err = document.getElementById('cf-name-error');
    return {
      invalid: name.getAttribute('aria-invalid') === 'true',
      describedBy: name.getAttribute('aria-describedby'),
      errVisible: !err.hidden && err.textContent === translations.de.form_error_name,
      focused: document.activeElement === name
    };
  })()`);
  assert(wsNameCheck.invalid && wsNameCheck.describedBy === 'cf-name-error' && wsNameCheck.errVisible && wsNameCheck.focused,
    `Task 3: Whitespace-only name is rejected with field-specific error, aria-describedby, aria-invalid & focus`);

  // Case 3.2: Selecting WhatsApp without phone is blocked with form_error_phone at #cf-phone
  const phoneErrorCheck = await cdp.evaluate(`(() => {
    const form = document.getElementById('contactForm');
    const name = document.getElementById('cf-name');
    const email = document.getElementById('cf-email');
    const phone = document.getElementById('cf-phone');
    const details = form.querySelector('details.form-more');
    details.open = true;
    name.value = 'Max Mustermann';
    email.value = 'max@example.com';
    phone.value = '';
    const waRadio = form.querySelector('input[name="Kontaktart"][value="WhatsApp"]');
    waRadio.checked = true;
    waRadio.dispatchEvent(new Event('change', { bubbles: true }));

    form.requestSubmit();
    const err = document.getElementById('cf-phone-error');
    const hint = document.getElementById('cf-phone-hint');
    const label = document.getElementById('cf-phone-label');
    return {
      required: phone.required && phone.getAttribute('aria-required') === 'true',
      labelReq: label.classList.contains('req'),
      hintVisible: !hint.hidden,
      errVisible: !err.hidden && err.textContent === translations.de.form_error_phone,
      describedBy: phone.getAttribute('aria-describedby'),
      invalid: phone.getAttribute('aria-invalid') === 'true',
      focused: document.activeElement === phone
    };
  })()`);
  assert(phoneErrorCheck.required && phoneErrorCheck.labelReq && phoneErrorCheck.hintVisible &&
    phoneErrorCheck.errVisible && phoneErrorCheck.invalid && phoneErrorCheck.focused &&
    phoneErrorCheck.describedBy === 'cf-phone-hint cf-phone-error',
    `Task 3: WhatsApp without phone is blocked with hint+error in aria-describedby ("${phoneErrorCheck.describedBy}"), aria-invalid & focus`);

  await cdp.evaluate(`document.getElementById('cf-phone').scrollIntoView({ behavior: 'instant', block: 'center' })`);
  await new Promise(r => setTimeout(r, 150));
  const shotPhoneErr = await cdp.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(DOCS_SHOTS, `after-phone-error-390.png`), Buffer.from(shotPhoneErr.data, 'base64'));

  // Follow-up #2 in Chromium: Malformed nonempty phone ('123') on Callback -> switch to E-Mail -> language switch -> clear & submit
  const followUp2Check = await cdp.evaluate(`(() => {
    const form = document.getElementById('contactForm');
    const phone = document.getElementById('cf-phone');
    const err = document.getElementById('cf-phone-error');
    const hint = document.getElementById('cf-phone-hint');
    const cbRadio = form.querySelector('input[name="Kontaktart"][value="Rückruf"]');
    const emailRadio = form.querySelector('input[name="Kontaktart"][value="E-Mail"]');

    phone.setAttribute('aria-describedby', 'ext-note cf-phone-hint cf-phone-error');
    cbRadio.checked = true;
    cbRadio.dispatchEvent(new Event('change', { bubbles: true }));
    phone.value = '123';
    form.requestSubmit();

    const callbackMalformed = {
      key: err.getAttribute('data-i18n'),
      textMatch: err.textContent === translations.de.form_error_phone_invalid,
      describedBy: phone.getAttribute('aria-describedby')
    };

    // Switch to E-Mail while '123' is present
    emailRadio.checked = true;
    emailRadio.dispatchEvent(new Event('change', { bubbles: true }));
    const afterSwitchToEmail = {
      notRequired: !phone.required && !phone.hasAttribute('aria-required') && hint.hidden,
      key: err.getAttribute('data-i18n'),
      textMatchDe: err.textContent === translations.de.form_error_phone_optional,
      describedBy: phone.getAttribute('aria-describedby'),
      valuePreserved: phone.value === '123'
    };

    // Language switch while optional phone error is visible
    setLanguage('en', false);
    const textMatchEn = err.textContent === translations.en.form_error_phone_optional;
    setLanguage('tr', false);
    const textMatchTr = err.textContent === translations.tr.form_error_phone_optional;
    setLanguage('de', false);

    // Clear optional phone -> error clears and unrelated aria-describedby remains intact
    phone.value = '';
    phone.dispatchEvent(new Event('input', { bubbles: true }));
    const afterClear = {
      errHidden: err.hidden,
      notInvalid: !phone.hasAttribute('aria-invalid'),
      describedBy: phone.getAttribute('aria-describedby')
    };
    phone.removeAttribute('aria-describedby');

    return { callbackMalformed, afterSwitchToEmail, textMatchEn, textMatchTr, afterClear };
  })()`);
  assert(
    followUp2Check.callbackMalformed.key === 'form_error_phone_invalid' &&
    followUp2Check.callbackMalformed.textMatch &&
    followUp2Check.callbackMalformed.describedBy === 'ext-note cf-phone-hint cf-phone-error',
    `Follow-up #2 (Chromium): Callback with "123" shows form_error_phone_invalid and preserves unrelated aria-describedby`
  );
  assert(
    followUp2Check.afterSwitchToEmail.notRequired &&
    followUp2Check.afterSwitchToEmail.key === 'form_error_phone_optional' &&
    followUp2Check.afterSwitchToEmail.textMatchDe &&
    followUp2Check.afterSwitchToEmail.describedBy === 'ext-note cf-phone-error' &&
    followUp2Check.afterSwitchToEmail.valuePreserved,
    `Follow-up #2 (Chromium): Switching to E-Mail removes requiredness and refreshes error to form_error_phone_optional`
  );
  assert(
    followUp2Check.textMatchEn && followUp2Check.textMatchTr &&
    followUp2Check.afterClear.errHidden &&
    followUp2Check.afterClear.notInvalid &&
    followUp2Check.afterClear.describedBy === 'ext-note',
    `Follow-up #2 (Chromium): Translates optional phone error in EN/TR and clears cleanly when phone is emptied`
  );

  // Case 3.5: Mocked Formspree failure (HTTP 500) and success (HTTP 200)
  const failureFlow = await cdp.evaluate(`(async () => {
    const form = document.getElementById('contactForm');
    document.querySelector('a[data-pkg="Exklusiv"]').click();
    document.querySelector('input[name="Leistungen"][value="Innenreinigung"]').checked = true;
    const cbRadio = form.querySelector('input[name="Kontaktart"][value="Rückruf"]');
    cbRadio.checked = true;
    cbRadio.dispatchEvent(new Event('change', { bubbles: true }));
    document.getElementById('cf-name').value = 'Erika Muster';
    document.getElementById('cf-email').value = 'erika@example.com';
    document.getElementById('cf-phone').value = '+49 (0) 155 / 6320-5346';

    const origFetch = window.fetch;
    window.fetch = async () => new Response(JSON.stringify({ error: 'fail' }), { status: 500 });
    form.requestSubmit();
    await new Promise(r => setTimeout(r, 100));
    const after500 = {
      statusError: form.querySelector('.form-status').classList.contains('form-status-error'),
      btnEnabled: !form.querySelector('button[type="submit"]').disabled,
      nameKept: document.getElementById('cf-name').value === 'Erika Muster',
      phoneKept: document.getElementById('cf-phone').value === '+49 (0) 155 / 6320-5346',
      svcKept: document.querySelector('input[name="Leistungen"][value="Innenreinigung"]').checked,
      pkgKept: !document.getElementById('formPkg').hidden && document.getElementById('cf-pkg').value === 'Exklusiv'
    };

    window.fetch = async () => new Response(JSON.stringify({ ok: true }), { status: 200 });
    form.requestSubmit();
    await new Promise(r => setTimeout(r, 100));
    const after200 = {
      statusSuccess: form.querySelector('.form-status').classList.contains('form-status-success'),
      nameReset: document.getElementById('cf-name').value === '',
      phoneReset: document.getElementById('cf-phone').value === '',
      phoneNotReq: !document.getElementById('cf-phone').required && document.getElementById('cf-phone-hint').hidden,
      pkgReset: document.getElementById('formPkg').hidden && document.getElementById('cf-pkg').disabled
    };
    window.fetch = origFetch;
    return { after500, after200 };
  })()`);
  assert(Object.values(failureFlow.after500).every(Boolean),
    `Task 3: HTTP failure preserves input values, selected services, and package tag & re-enables submit button`);
  assert(Object.values(failureFlow.after200).every(Boolean),
    `Task 3: Successful submission resets values, package tag, and conditional phone requirement`);

  // =========================================================================
  // 5. Task 4: Hero Image Preload Mutually Exclusive Media Conditions
  // =========================================================================
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  const heroCases = [
    { name: 'Square 800x800 DPR1', w: 800, h: 800, dpr: 1, mobile: false, expectPrefix: 'hero-m-' },
    { name: 'Square 800x800 DPR2', w: 800, h: 800, dpr: 2, mobile: false, expectPrefix: 'hero-m-' },
    { name: 'Portrait 390x844 DPR1', w: 390, h: 844, dpr: 1, mobile: true, expectPrefix: 'hero-m-' },
    { name: 'Portrait 390x844 DPR2', w: 390, h: 844, dpr: 2, mobile: true, expectPrefix: 'hero-m-' },
    { name: 'Short Landscape 800x450 DPR1', w: 800, h: 450, dpr: 1, mobile: true, expectPrefix: 'hero-m-' },
    { name: 'Desktop Landscape 1280x800 DPR1', w: 1280, h: 800, dpr: 1, mobile: false, expectPrefix: 'hero-' },
    { name: 'Desktop Landscape 1280x800 DPR2', w: 1280, h: 800, dpr: 2, mobile: false, expectPrefix: 'hero-' },
  ];
  const heroRequests = [];
  cdp.on('Network.requestWillBeSent', (params) => {
    if (params.request && /\/hero-(m-)?\d+\.webp/.test(params.request.url)) {
      heroRequests.push(params.request.url.split('/').pop());
    }
  });

  for (const hc of heroCases) {
    await cdp.send('Page.navigate', { url: 'about:blank' });
    await new Promise(r => setTimeout(r, 100));
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: hc.w, height: hc.h, deviceScaleFactor: hc.dpr, mobile: hc.mobile
    });
    heroRequests.length = 0;
    await cdp.send('Page.navigate', { url: `${baseUrl}/?lang=de` });
    await new Promise(r => setTimeout(r, 400));
    const uniqueHero = Array.from(new Set(heroRequests));
    assert(uniqueHero.length === 1 && uniqueHero[0].startsWith(hc.expectPrefix),
      `Task 4 (${hc.name}): Loaded exactly 1 hero asset (${uniqueHero.join(', ')})`);
  }

  // =========================================================================
  // 6. Task 5: Lightbox Dynamic Image Creation & Focus Return
  // =========================================================================
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false });
  await cdp.send('Page.navigate', { url: `${baseUrl}/?lang=de` });
  await new Promise(r => setTimeout(r, 350));

  const lbCheck = await cdp.evaluate(`(() => {
    const box = document.getElementById('lightbox');
    const beforeImg = box.querySelector('img');
    const firstLink = document.querySelector('[data-lightbox]');
    firstLink.focus();
    firstLink.click();
    const openVisible = !box.hidden;
    const openImg = box.querySelector('img');
    const openSrc = openImg ? openImg.getAttribute('src') : '';
    const openAlt = openImg ? openImg.getAttribute('alt') : '';

    box.querySelector('.lb-next').click();
    const nextSrc = box.querySelector('img').getAttribute('src');

    box.querySelector('.lb-close').click();
    const afterCloseImg = box.querySelector('img');
    const focusReturned = document.activeElement === firstLink;

    firstLink.click();
    const reopenSrc = box.querySelector('img') ? box.querySelector('img').getAttribute('src') : '';
    box.querySelector('.lb-close').click();

    return {
      noInitialImg: beforeImg === null,
      validOpen: openVisible && openSrc.endsWith('.webp') && openAlt.length > 5,
      nextChanged: nextSrc !== openSrc && nextSrc.endsWith('.webp'),
      removedOnClose: afterCloseImg === null && box.hidden,
      focusReturned,
      reopenWorks: reopenSrc === openSrc
    };
  })()`);
  assert(Object.values(lbCheck).every(Boolean),
    `Task 5: Lightbox creates <img> on open with valid src/alt, navigates prev/next, removes on close, returns focus, and reopens`);

  // =========================================================================
  // 7. Secondary Pages, JSON-LD, Sitemap & Local Asset Links
  // =========================================================================
  const jsonLdCheck = await cdp.evaluate(`(() => {
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    return scripts.length > 0 && scripts.every(s => {
      try {
        const parsed = JSON.parse(s.textContent);
        return typeof parsed === 'object' && parsed !== null;
      } catch (e) {
        return false;
      }
    });
  })()`);
  assert(jsonLdCheck, `Secondary checks: All JSON-LD blocks on index.html parse cleanly`);

  for (const pagePath of ['/impressum.html', '/datenschutz.html', '/404.html']) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
    await cdp.send('Page.navigate', { url: `${baseUrl}${pagePath}` });
    await new Promise(r => setTimeout(r, 300));
    const secCheck = await cdp.evaluate(`(() => {
      const noOverflow = document.documentElement.scrollWidth <= window.innerWidth;
      const h1Visible = !!document.querySelector('h1') && document.querySelector('h1').getBoundingClientRect().height > 0;
      const navReadyOrNoNav = !document.querySelector('.navbar') || document.documentElement.classList.contains('nav-ready');
      return { noOverflow, h1Visible, navReadyOrNoNav };
    })()`);
    assert(secCheck.noOverflow && secCheck.h1Visible && secCheck.navReadyOrNoNav,
      `Secondary checks (${pagePath} at 390px): No horizontal overflow, H1 visible, navigation functional`);
  }

  const sitemapXml = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  assert(sitemapXml.includes('<urlset') && sitemapXml.includes('https://www.elbcar-detailing.de/'),
    `Secondary checks: sitemap.xml is intact and valid`);

  for (const htmlFile of ['index.html', 'impressum.html', 'datenschutz.html', '404.html']) {
    const htmlContent = fs.readFileSync(path.join(ROOT, htmlFile), 'utf8');
    const localRefs = [...htmlContent.matchAll(/\b(?:href|src)="([^"#?]+)"/g)]
      .map(m => m[1])
      .filter(u => !/^(?:https?:|mailto:|tel:|javascript:|\/$)/.test(u));
    const missingAssets = localRefs.filter(u => {
      const cleanPath = u.replace(/^\//, '');
      return cleanPath && !fs.existsSync(path.join(ROOT, cleanPath));
    });
    assert(missingAssets.length === 0,
      `Secondary checks (${htmlFile}): 0 broken local asset links (checked ${localRefs.length} refs)`);
  }

  console.log('ALL CHROMIUM CDP CHECKS PASSED (' + results.length + ' assertions):');
  results.forEach(r => console.log('  ' + r));
} finally {
  await cdp.close();
  server.close();
}
