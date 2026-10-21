/**
 * Zero-dependency Node.js verification harness for ElbCar Detailing
 * Covers static HTML/CSS/i18n/SEO integrity plus mocked-DOM runtime tests for:
 *   - Follow-up #1: Preserving focus across the 1100px language-control breakpoint
 *   - Follow-up #2: Distinguishing missing required phone numbers from malformed required/optional numbers
 *
 * Run with:
 *   node docs/verification/verify-followup.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');

const results = [];
function assert(cond, msg) {
  if (!cond) {
    throw new Error('ASSERTION FAILED: ' + msg);
  }
  results.push('PASS: ' + msg);
}

// ============================================================================
// 1. Static Repository, i18n, Asset & Reference Checks
// ============================================================================
const mainJs = fs.readFileSync(path.join(ROOT, 'js', 'main.js'), 'utf8');
const styleCss = fs.readFileSync(path.join(ROOT, 'css', 'style.css'), 'utf8');
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const impressumHtml = fs.readFileSync(path.join(ROOT, 'impressum.html'), 'utf8');
const datenschutzHtml = fs.readFileSync(path.join(ROOT, 'datenschutz.html'), 'utf8');
const notFoundHtml = fs.readFileSync(path.join(ROOT, '404.html'), 'utf8');

// 1.1 JS syntax check
new vm.Script(mainJs, { filename: 'js/main.js' });
assert(true, 'Static: js/main.js parses without syntax errors');

// 1.2 Extract translations object
const trMatch = mainJs.match(/const translations = (\{[\s\S]*?\n\});/);
assert(!!trMatch, 'Static: translations object extracted from js/main.js');
const translations = vm.runInNewContext('(' + trMatch[1] + ')');

const deKeys = Object.keys(translations.de);
const enKeys = Object.keys(translations.en);
const trKeys = Object.keys(translations.tr);
const missingInEn = deKeys.filter(k => !(k in translations.en));
const missingInTr = deKeys.filter(k => !(k in translations.tr));
const extraInEn = enKeys.filter(k => !(k in translations.de));
const extraInTr = trKeys.filter(k => !(k in translations.de));
assert(
  deKeys.length === enKeys.length &&
  deKeys.length === trKeys.length &&
  missingInEn.length === 0 &&
  missingInTr.length === 0 &&
  extraInEn.length === 0 &&
  extraInTr.length === 0,
  `Static: DE/EN/TR dictionaries have identical key sets (${deKeys.length} keys each)`
);

for (const lang of ['de', 'en', 'tr']) {
  assert(
    translations[lang].form_error_phone &&
    translations[lang].form_error_phone_invalid &&
    translations[lang].form_error_phone_optional &&
    translations[lang].form_error_phone !== translations[lang].form_error_phone_invalid &&
    translations[lang].form_error_phone_invalid !== translations[lang].form_error_phone_optional,
    `Static (${lang}): Distinct missing-required, malformed-required, and malformed-optional phone error strings exist`
  );
}

// 1.3 Verify all static German data-i18n* bindings in index.html match translations.de
function decodeEntities(str) {
  return str
    .replace(/&nbsp;/g, '\u00a0')
    .replace(/&shy;/g, '\u00ad')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, '’')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/&rarr;/g, '→')
    .replace(/&euro;/g, '€')
    .replace(/&sect;/g, '§')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)));
}

let i18nBindingCount = 0;
const i18nMismatches = [];

// Check attribute bindings: data-i18n-aria, data-i18n-title, data-i18n-alt, data-i18n-content
const attrMap = [
  ['data-i18n-aria', 'aria-label'],
  ['data-i18n-title', 'title'],
  ['data-i18n-alt', 'alt'],
  ['data-i18n-content', 'content']
];
for (const [dataAttr, htmlAttr] of attrMap) {
  const tagRegex = new RegExp(`<[^>]+\\b${dataAttr}="([^"]+)"[^>]*>`, 'g');
  for (const m of indexHtml.matchAll(tagRegex)) {
    const tag = m[0];
    const key = m[1];
    const attrValMatch = tag.match(new RegExp(`(?<![\\w-])${htmlAttr}="([^"]*)"`));
    const actual = attrValMatch ? decodeEntities(attrValMatch[1]) : '';
    const expected = translations.de[key];
    i18nBindingCount++;
    if (actual !== expected) {
      i18nMismatches.push(`${dataAttr}="${key}": expected "${expected}", got "${actual}"`);
    }
  }
}

// Check text/placeholder bindings: data-i18n="key"
const openTagRegex = /<([a-zA-Z0-9-]+)\b([^>]*?\bdata-i18n="([^"]+)"[^>]*?)>/g;
for (const m of indexHtml.matchAll(openTagRegex)) {
  const tagName = m[1].toLowerCase();
  const attrs = m[2];
  const key = m[3];
  const expected = translations.de[key];
  i18nBindingCount++;
  if (tagName === 'input' || tagName === 'textarea') {
    const phMatch = attrs.match(/(?<![\w-])placeholder="([^"]*)"/);
    const actual = phMatch ? decodeEntities(phMatch[1]) : '';
    if (actual !== expected) {
      i18nMismatches.push(`placeholder data-i18n="${key}": expected "${expected}", got "${actual}"`);
    }
  } else {
    const startIdx = m.index + m[0].length;
    const closeTag = `</${m[1]}>`;
    const endIdx = indexHtml.indexOf(closeTag, startIdx);
    const inner = endIdx !== -1 ? decodeEntities(indexHtml.slice(startIdx, endIdx).replace(/<[^>]+>/g, '')) : '';
    if (inner !== expected) {
      i18nMismatches.push(`text data-i18n="${key}": expected "${expected}", got "${inner}"`);
    }
  }
}
assert(
  i18nMismatches.length === 0,
  `Static: All ${i18nBindingCount} German data-i18n* bindings in index.html match translations.de` +
  (i18nMismatches.length ? '\n  ' + i18nMismatches.join('\n  ') : '')
);

// 1.4 Check duplicate IDs, label/ARIA references, local fragments, and empty images across all 4 HTML pages
const pages = [
  ['index.html', indexHtml],
  ['impressum.html', impressumHtml],
  ['datenschutz.html', datenschutzHtml],
  ['404.html', notFoundHtml]
];

let totalLocalRefs = 0;
for (const [name, html] of pages) {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  const idSet = new Set(ids);
  assert(ids.length === idSet.size, `Static (${name}): Zero duplicate IDs (${ids.length} unique IDs)`);

  const refAttrs = ['for', 'aria-controls', 'aria-labelledby', 'aria-describedby'];
  const brokenRefs = [];
  for (const attr of refAttrs) {
    const re = new RegExp(`\\b${attr}="([^"]+)"`, 'g');
    for (const m of html.matchAll(re)) {
      for (const token of m[1].trim().split(/\s+/).filter(Boolean)) {
        if (!idSet.has(token)) brokenRefs.push(`${attr}->${token}`);
      }
    }
  }
  for (const m of html.matchAll(/\bhref="#([^"]+)"/g)) {
    if (!idSet.has(m[1])) brokenRefs.push(`href->#${m[1]}`);
  }
  assert(brokenRefs.length === 0, `Static (${name}): All label/ARIA/fragment references resolve`);

  // Check for empty <img> tags
  const imgTags = [...html.matchAll(/<img\b[^>]*>/g)].map(m => m[0]);
  const emptyImgs = imgTags.filter(tag => {
    const src = (tag.match(/\bsrc="([^"]*)"/) || [])[1] || '';
    const srcset = (tag.match(/\bsrcset="([^"]*)"/) || [])[1] || '';
    return !src.trim() && !srcset.trim();
  });
  assert(emptyImgs.length === 0, `Static (${name}): Zero empty <img> elements`);

  // Check local asset references
  for (const m of html.matchAll(/\b(?:href|src)="([^"#?]+)"/g)) {
    const ref = m[1];
    if (/^(?:https?:|mailto:|tel:|javascript:|\/$)/.test(ref)) continue;
    totalLocalRefs++;
    const diskPath = path.join(ROOT, ref.replace(/^\//, ''));
    assert(fs.existsSync(diskPath), `Static (${name}): Asset exists -> ${ref}`);
  }
  for (const m of html.matchAll(/\b(?:srcset|imagesrcset)="([^"]+)"/g)) {
    for (const part of m[1].split(',')) {
      const url = part.trim().split(/\s+/)[0];
      if (!url || /^https?:/.test(url)) continue;
      totalLocalRefs++;
      const diskPath = path.join(ROOT, url.replace(/^\//, ''));
      assert(fs.existsSync(diskPath), `Static (${name}): Srcset asset exists -> ${url}`);
    }
  }
}

for (const m of styleCss.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
  const ref = m[1];
  if (/^data:|^https?:/.test(ref)) continue;
  totalLocalRefs++;
  const diskPath = path.resolve(path.join(ROOT, 'css'), ref);
  assert(fs.existsSync(diskPath), `Static (css/style.css): Font/asset exists -> ${ref}`);
}
assert(totalLocalRefs > 0, `Static: All ${totalLocalRefs} local HTML/CSS asset references resolve`);

// 1.5 JSON-LD and sitemap.xml
const jsonLdBlocks = [...indexHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
assert(jsonLdBlocks.length > 0, 'Static: JSON-LD script blocks present in index.html');
for (const block of jsonLdBlocks) {
  const parsed = JSON.parse(block[1]);
  assert(typeof parsed === 'object' && parsed !== null, 'Static: JSON-LD block parses cleanly');
}
const sitemapXml = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
assert(sitemapXml.includes('<urlset') && sitemapXml.includes('https://www.elbcar-detailing.de/'), 'Static: sitemap.xml parses cleanly');

// 1.6 Delivered screenshots check
const expectedScreenshots = [
  'before-header-320.png',
  'before-header-390.png',
  'after-header-320.png',
  'after-header-390.png',
  'after-lang-picker-open-390.png',
  'after-phone-error-390.png'
];
for (const shot of expectedScreenshots) {
  const shotPath = path.join(ROOT, 'docs', 'screenshots', shot);
  assert(fs.existsSync(shotPath) && fs.statSync(shotPath).size > 1000, `Deliverable: docs/screenshots/${shot} exists and is non-empty`);
}

// ============================================================================
// 2. Minimal Mocked-DOM Runtime Harness for js/main.js
// ============================================================================
class MockClassList {
  constructor(el) {
    this._el = el;
    this._set = new Set();
  }
  _syncFromAttr(val) {
    this._set = new Set(String(val || '').trim().split(/\s+/).filter(Boolean));
  }
  add(...tokens) {
    tokens.forEach(t => { if (t) this._set.add(t); });
  }
  remove(...tokens) {
    tokens.forEach(t => this._set.delete(t));
  }
  toggle(token, force) {
    const shouldAdd = force !== undefined ? !!force : !this._set.has(token);
    if (shouldAdd) this._set.add(token);
    else this._set.delete(token);
    return shouldAdd;
  }
  contains(token) {
    return this._set.has(token);
  }
  toString() {
    return Array.from(this._set).join(' ');
  }
}

class MockElement {
  constructor(tagName, doc, attrs = {}) {
    this.tagName = tagName.toUpperCase();
    this.ownerDocument = doc;
    this.parentNode = null;
    this.children = [];
    this.attributes = new Map();
    this.dataset = {};
    this.style = {};
    this.classList = new MockClassList(this);
    this.listeners = new Map();
    this.textContent = '';
    this.value = '';
    this.defaultValue = '';
    this.checked = false;
    this.defaultChecked = false;
    this.disabled = false;
    this.required = false;
    this.hidden = false;
    this.open = false;
    this.lastFocusOptions = null;

    for (const [k, v] of Object.entries(attrs)) {
      this.setAttribute(k, v);
    }
  }

  get id() { return this.getAttribute('id') || ''; }
  set id(v) { this.setAttribute('id', v); }

  get className() { return this.classList.toString(); }
  set className(v) { this.classList._syncFromAttr(v); }

  get name() { return this.getAttribute('name') || ''; }
  set name(v) { this.setAttribute('name', v); }

  get type() { return this.getAttribute('type') || ''; }
  set type(v) { this.setAttribute('type', v); }

  get href() { return this.getAttribute('href') || ''; }
  set href(v) { this.setAttribute('href', v); }

  get action() { return this.getAttribute('action') || ''; }

  setAttribute(name, val) {
    const s = String(val);
    this.attributes.set(name, s);
    if (name === 'class') this.classList._syncFromAttr(s);
    if (name === 'hidden') this.hidden = true;
    if (name === 'disabled') this.disabled = true;
    if (name === 'required') this.required = true;
    if (name === 'checked') { this.checked = true; this.defaultChecked = true; }
    if (name === 'value') { this.value = s; this.defaultValue = s; }
    if (name.startsWith('data-')) {
      const camel = name.slice(5).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      this.dataset[camel] = s;
    }
  }

  getAttribute(name) {
    return this.attributes.has(name) ? this.attributes.get(name) : null;
  }

  hasAttribute(name) {
    return this.attributes.has(name);
  }

  removeAttribute(name) {
    this.attributes.delete(name);
    if (name === 'hidden') this.hidden = false;
    if (name === 'disabled') this.disabled = false;
    if (name === 'required') this.required = false;
    if (name.startsWith('data-')) {
      const camel = name.slice(5).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      delete this.dataset[camel];
    }
  }

  appendChild(child) {
    if (child.parentNode) {
      const i = child.parentNode.children.indexOf(child);
      if (i !== -1) child.parentNode.children.splice(i, 1);
    }
    child.parentNode = this;
    this.children.push(child);
    return child;
  }

  insertBefore(newNode, refNode) {
    if (newNode.parentNode) {
      const i = newNode.parentNode.children.indexOf(newNode);
      if (i !== -1) newNode.parentNode.children.splice(i, 1);
    }
    newNode.parentNode = this;
    const idx = refNode ? this.children.indexOf(refNode) : -1;
    if (idx === -1) this.children.push(newNode);
    else this.children.splice(idx, 0, newNode);
    return newNode;
  }

  remove() {
    if (this.parentNode) {
      const i = this.parentNode.children.indexOf(this);
      if (i !== -1) this.parentNode.children.splice(i, 1);
      this.parentNode = null;
    }
  }

  contains(other) {
    let cur = other;
    while (cur) {
      if (cur === this) return true;
      cur = cur.parentNode;
    }
    return false;
  }

  matches(selector) {
    return selector.split(',').map(s => s.trim()).filter(Boolean).some(sel => this._matchesSingle(sel));
  }

  _matchesSingle(sel) {
    // Support descendant combinator
    const parts = sel.trim().split(/\s+/);
    if (parts.length > 1) {
      const last = parts.pop();
      if (!this._matchesAtom(last)) return false;
      let ancestor = this.parentNode;
      const ancestorSel = parts.join(' ');
      while (ancestor && ancestor instanceof MockElement) {
        if (ancestor._matchesSingle(ancestorSel)) return true;
        ancestor = ancestor.parentNode;
      }
      return false;
    }
    return this._matchesAtom(parts[0]);
  }

  _matchesAtom(atom) {
    if (!atom) return false;
    // Handle :not(...)
    let base = atom;
    const notMatches = [...base.matchAll(/:not\(([^)]+)\)/g)];
    for (const nm of notMatches) {
      if (this._matchesAtom(nm[1])) return false;
      base = base.replace(nm[0], '');
    }
    if (base.includes(':checked')) {
      if (!this.checked) return false;
      base = base.replace(':checked', '');
    }
    // Attribute selectors
    const attrMatches = [...base.matchAll(/\[([^\]=^]+)(?:(\^?=)"([^"]*)")?\]/g)];
    for (const am of attrMatches) {
      const attrName = am[1];
      const op = am[2];
      const attrVal = am[3];
      if (!op) {
        if (!this.hasAttribute(attrName) && !(attrName === 'disabled' && this.disabled)) return false;
      } else if (op === '=') {
        if (this.getAttribute(attrName) !== attrVal) return false;
      } else if (op === '^=') {
        const v = this.getAttribute(attrName) || '';
        if (!v.startsWith(attrVal)) return false;
      }
      base = base.replace(am[0], '');
    }
    // IDs
    const idMatches = [...base.matchAll(/#([a-zA-Z0-9_-]+)/g)];
    for (const im of idMatches) {
      if (this.id !== im[1]) return false;
      base = base.replace(im[0], '');
    }
    // Classes
    const classMatches = [...base.matchAll(/\.([a-zA-Z0-9_-]+)/g)];
    for (const cm of classMatches) {
      if (!this.classList.contains(cm[1])) return false;
      base = base.replace(cm[0], '');
    }
    // Tag name
    const tag = base.trim();
    if (tag && tag !== '*' && this.tagName !== tag.toUpperCase()) return false;
    return true;
  }

  closest(selector) {
    let cur = this;
    while (cur && cur instanceof MockElement) {
      if (cur.matches(selector)) return cur;
      cur = cur.parentNode;
    }
    return null;
  }

  querySelectorAll(selector) {
    const out = [];
    const visit = (node) => {
      for (const child of node.children) {
        if (child.matches(selector)) out.push(child);
        visit(child);
      }
    };
    visit(this);
    return out;
  }

  querySelector(selector) {
    return this.querySelectorAll(selector)[0] || null;
  }

  addEventListener(type, fn) {
    if (!this.listeners.has(type)) this.listeners.set(type, []);
    this.listeners.get(type).push(fn);
  }

  dispatchEvent(event) {
    event.target = event.target || this;
    let cur = this;
    while (cur) {
      const list = cur.listeners && cur.listeners.get(event.type);
      if (list) {
        for (const fn of [...list]) {
          fn.call(cur, event);
        }
      }
      if (!event.bubbles) break;
      cur = cur.parentNode || (cur !== this.ownerDocument ? this.ownerDocument : null);
    }
    return !event.defaultPrevented;
  }

  focus(options = {}) {
    this.lastFocusOptions = options;
    this.ownerDocument.activeElement = this;
  }

  blur() {
    if (this.ownerDocument.activeElement === this) {
      this.ownerDocument.activeElement = this.ownerDocument.body;
    }
  }

  click() {
    if (this.tagName === 'INPUT' && this.type === 'radio') {
      const form = this.closest('form') || this.ownerDocument;
      form.querySelectorAll(`input[name="${this.name}"]`).forEach(r => { r.checked = false; });
      this.checked = true;
    }
    const ev = { type: 'click', target: this, bubbles: true, button: 0, preventDefault() { this.defaultPrevented = true; } };
    this.dispatchEvent(ev);
  }

  checkValidity() {
    if (this.required && !String(this.value || '').trim()) return false;
    if (this.type === 'email' && this.value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
    }
    return true;
  }

  scrollIntoView() {}
  getBoundingClientRect() { return { top: 100, bottom: 144, left: 0, right: 100, width: 100, height: 44 }; }
  getClientRects() { return this.hidden ? [] : [this.getBoundingClientRect()]; }

  reset() {
    this.querySelectorAll('input, textarea').forEach(el => {
      if (el.type === 'radio' || el.type === 'checkbox') {
        el.checked = !!el.defaultChecked;
      } else {
        el.value = el.defaultValue || '';
      }
    });
    this.dispatchEvent({ type: 'reset', target: this, bubbles: true, preventDefault() {} });
  }
}

function createHarness() {
  let isWide = false;
  const mediaListeners = [];
  let fetchResponse = { ok: true, status: 200 };
  let fetchCalls = 0;

  const doc = {
    readyState: 'complete',
    listeners: new Map(),
    activeElement: null,
    documentElement: null,
    body: null,
    createElement(tag) { return new MockElement(tag, doc); },
    addEventListener(type, fn) {
      if (!this.listeners.has(type)) this.listeners.set(type, []);
      this.listeners.get(type).push(fn);
    },
    dispatchEvent(event) {
      event.target = event.target || this;
      const list = this.listeners.get(event.type) || [];
      for (const fn of [...list]) fn.call(this, event);
    },
    querySelectorAll(sel) { return this.documentElement.querySelectorAll(sel); },
    querySelector(sel) { return this.documentElement.querySelector(sel); },
    getElementById(id) { return this.documentElement.querySelector(`#${id}`); }
  };

  const html = new MockElement('html', doc, { lang: 'de' });
  const body = new MockElement('body', doc);
  html.appendChild(body);
  doc.documentElement = html;
  doc.body = body;
  doc.activeElement = body;

  // Build navbar structure matching index.html
  const nav = new MockElement('nav', doc, { class: 'navbar', 'aria-label': 'Hauptnavigation', 'data-i18n-aria': 'aria_nav' });
  const navContainer = new MockElement('div', doc, { class: 'container' });
  const brand = new MockElement('a', doc, { href: '#', class: 'nav-brand' });
  const menu = new MockElement('div', doc, { class: 'nav-menu', id: 'navMenu' });
  const navLinks = new MockElement('ul', doc, { class: 'nav-links' });
  const li1 = new MockElement('li', doc);
  const a1 = new MockElement('a', doc, { href: '#services', 'data-i18n': 'nav_services' });
  a1.textContent = translations.de.nav_services;
  li1.appendChild(a1);
  navLinks.appendChild(li1);
  menu.appendChild(navLinks);

  // Desktop lang-switch inside #navMenu
  const desktopLangSwitch = new MockElement('div', doc, { class: 'lang-switch', role: 'group', 'aria-label': 'Sprache wählen', 'data-i18n-aria': 'aria_lang' });
  for (const code of ['de', 'en', 'tr']) {
    const btn = new MockElement('button', doc, {
      type: 'button',
      class: code === 'de' ? 'lang-btn active' : 'lang-btn',
      'data-lang': code,
      'aria-pressed': code === 'de' ? 'true' : 'false'
    });
    btn.textContent = code.toUpperCase();
    desktopLangSwitch.appendChild(btn);
  }
  menu.appendChild(desktopLangSwitch);

  // Mobile #langDropdown inside .navbar
  const dropdown = new MockElement('div', doc, { class: 'lang-dropdown', id: 'langDropdown' });
  const trigger = new MockElement('button', doc, {
    type: 'button',
    class: 'lang-trigger',
    id: 'langTrigger',
    'aria-expanded': 'false',
    'aria-controls': 'langPicker',
    'aria-label': 'Sprache wählen: Deutsch',
    'data-i18n-aria': 'aria_lang_current'
  });
  const triggerCode = new MockElement('span', doc, { class: 'lang-trigger-code' });
  triggerCode.textContent = 'DE';
  trigger.appendChild(triggerCode);
  const picker = new MockElement('div', doc, {
    class: 'lang-picker',
    id: 'langPicker',
    role: 'group',
    'aria-label': 'Sprache wählen',
    'data-i18n-aria': 'aria_lang',
    hidden: ''
  });
  for (const [code, label] of [['de', 'Deutsch'], ['en', 'English'], ['tr', 'Türkçe']]) {
    const opt = new MockElement('button', doc, {
      type: 'button',
      class: code === 'de' ? 'lang-option active' : 'lang-option',
      'data-lang': code,
      lang: code,
      'aria-pressed': code === 'de' ? 'true' : 'false'
    });
    opt.textContent = label;
    picker.appendChild(opt);
  }
  dropdown.appendChild(trigger);
  dropdown.appendChild(picker);

  const navToggle = new MockElement('button', doc, {
    type: 'button',
    class: 'nav-toggle',
    id: 'navToggle',
    'aria-label': 'Menü',
    'aria-expanded': 'false',
    'aria-controls': 'navMenu'
  });

  navContainer.appendChild(brand);
  navContainer.appendChild(menu);
  navContainer.appendChild(dropdown);
  navContainer.appendChild(navToggle);
  nav.appendChild(navContainer);
  body.appendChild(nav);

  // Build #contactForm matching index.html
  const form = new MockElement('form', doc, {
    class: 'contact-form',
    id: 'contactForm',
    action: 'https://formspree.io/f/mvzvwqrd',
    method: 'POST',
    novalidate: ''
  });
  const formTitle = new MockElement('h3', doc, { class: 'form-title', id: 'form-title', tabindex: '-1' });
  form.appendChild(formTitle);

  const formPkg = new MockElement('div', doc, { class: 'form-pkg', id: 'formPkg', hidden: '' });
  const pkgName = new MockElement('strong', doc, { class: 'form-pkg-name' });
  const pkgRemove = new MockElement('button', doc, { type: 'button', class: 'form-pkg-x' });
  const pkgInput = new MockElement('input', doc, { type: 'hidden', name: 'Paket', id: 'cf-pkg', disabled: '' });
  formPkg.appendChild(pkgName);
  formPkg.appendChild(pkgRemove);
  formPkg.appendChild(pkgInput);
  form.appendChild(formPkg);

  // Name group
  const nameGroup = new MockElement('div', doc, { class: 'form-group' });
  const nameLabel = new MockElement('label', doc, { for: 'cf-name', class: 'req', 'data-i18n': 'form_name' });
  const nameInput = new MockElement('input', doc, { type: 'text', id: 'cf-name', name: 'Name', required: '' });
  const nameError = new MockElement('p', doc, { class: 'form-error', id: 'cf-name-error', hidden: '' });
  nameGroup.appendChild(nameLabel);
  nameGroup.appendChild(nameInput);
  nameGroup.appendChild(nameError);
  form.appendChild(nameGroup);

  // Email group
  const emailGroup = new MockElement('div', doc, { class: 'form-group' });
  const emailLabel = new MockElement('label', doc, { for: 'cf-email', class: 'req', 'data-i18n': 'form_email' });
  const emailInput = new MockElement('input', doc, { type: 'email', id: 'cf-email', name: 'email', required: '' });
  emailGroup.appendChild(emailLabel);
  emailGroup.appendChild(emailInput);
  form.appendChild(emailGroup);

  // Phone group
  const phoneGroup = new MockElement('div', doc, { class: 'form-group', id: 'cf-phone-group' });
  const phoneLabel = new MockElement('label', doc, { for: 'cf-phone', id: 'cf-phone-label', 'data-i18n': 'form_phone' });
  const phoneHint = new MockElement('p', doc, { class: 'form-field-hint', id: 'cf-phone-hint', 'data-i18n': 'form_phone_required_hint', hidden: '' });
  phoneHint.textContent = translations.de.form_phone_required_hint;
  const phoneInput = new MockElement('input', doc, { type: 'tel', id: 'cf-phone', name: 'Telefon' });
  const phoneError = new MockElement('p', doc, { class: 'form-error', id: 'cf-phone-error', hidden: '' });
  phoneGroup.appendChild(phoneLabel);
  phoneGroup.appendChild(phoneHint);
  phoneGroup.appendChild(phoneInput);
  phoneGroup.appendChild(phoneError);
  form.appendChild(phoneGroup);

  // Services choice
  const svcFieldset = new MockElement('fieldset', doc, { class: 'form-choice' });
  const svcCheck = new MockElement('input', doc, { type: 'checkbox', name: 'Leistungen', value: 'Innenreinigung' });
  svcFieldset.appendChild(svcCheck);
  form.appendChild(svcFieldset);

  // Contact preference radios inside details.form-more
  const details = new MockElement('details', doc, { class: 'form-more' });
  const prefFieldset = new MockElement('fieldset', doc, { class: 'form-choice', id: 'cf-contact-pref' });
  for (const [val, cond] of [['E-Mail', false], ['Rückruf', true], ['WhatsApp', true]]) {
    const lbl = new MockElement('label', doc, { class: 'form-pill' });
    if (cond) {
      lbl.setAttribute('data-channel-cond', '');
      lbl.setAttribute('hidden', '');
    }
    const radio = new MockElement('input', doc, {
      type: 'radio',
      name: 'Kontaktart',
      value: val,
      ...(val === 'E-Mail' ? { checked: '' } : { disabled: '' })
    });
    lbl.appendChild(radio);
    prefFieldset.appendChild(lbl);
  }
  details.appendChild(prefFieldset);
  form.appendChild(details);

  const submitBtn = new MockElement('button', doc, { type: 'submit', class: 'btn btn-primary', 'data-i18n': 'form_btn' });
  form.appendChild(submitBtn);
  body.appendChild(form);

  // Footer with its own .lang-switch (outside .navbar)
  const footer = new MockElement('footer', doc, { class: 'footer' });
  const footerLangSwitch = new MockElement('div', doc, { class: 'lang-switch' });
  for (const code of ['de', 'en', 'tr']) {
    const fBtn = new MockElement('button', doc, { type: 'button', class: 'lang-btn', 'data-lang': code });
    footerLangSwitch.appendChild(fBtn);
  }
  footer.appendChild(footerLangSwitch);
  body.appendChild(footer);

  // Package booking link
  const pkgLink = new MockElement('a', doc, { href: '#contactForm', 'data-pkg': 'Exklusiv', 'data-pkg-key': 'form_pkg_exklusiv' });
  body.appendChild(pkgLink);

  const storage = new Map();
  const context = vm.createContext({
    window: null,
    document: doc,
    navigator: { userAgent: 'Mozilla/5.0', language: 'de-DE', languages: ['de-DE'] },
    location: { href: 'https://www.elbcar-detailing.de/', search: '', hash: '' },
    history: { replaceState() {}, pushState() {} },
    localStorage: {
      getItem: (k) => storage.has(k) ? storage.get(k) : null,
      setItem: (k, v) => storage.set(k, String(v))
    },
    URL,
    URLSearchParams,
    FormData: class {
      constructor() { this._map = new Map(); }
      set(k, v) { this._map.set(k, v); }
    },
    AbortController: class {
      constructor() { this.signal = {}; }
      abort() {}
    },
    fetch: async () => {
      fetchCalls++;
      return { ok: fetchResponse.ok, status: fetchResponse.status, json: async () => ({}) };
    },
    getComputedStyle: () => ({ visibility: 'visible', display: 'block', scrollPaddingTop: '0' }),
    matchMedia: (q) => {
      if (q === '(min-width: 1100px)') {
        const mql = {
          get matches() { return isWide; },
          media: q,
          addEventListener(type, fn) { if (type === 'change') mediaListeners.push(fn); }
        };
        return mql;
      }
      return { matches: false, media: q, addEventListener() {} };
    },
    setTimeout: (fn, ms = 0) => { if (ms === 0) queueMicrotask(fn); return 1; },
    clearTimeout: () => {},
    requestAnimationFrame: (fn) => { queueMicrotask(fn); return 1; },
    addEventListener: () => {},
    scrollTo: () => {},
    scrollY: 0,
    innerHeight: 800,
    console
  });
  context.window = context;

  vm.runInContext(mainJs, context, { filename: 'js/main.js' });

  return {
    doc,
    context,
    trigger,
    picker,
    dropdown,
    desktopLangSwitch,
    footerLangSwitch,
    form,
    nameInput,
    emailInput,
    phoneInput,
    phoneLabel,
    phoneHint,
    phoneError,
    pkgLink,
    svcCheck,
    setViewportWide(wideVal) {
      isWide = wideVal;
      for (const fn of mediaListeners) {
        fn({ matches: isWide });
      }
    },
    async submitForm() {
      form.dispatchEvent({ type: 'submit', target: form, bubbles: true, preventDefault() {} });
      await new Promise(r => setImmediate(r));
    },
    setFetchResponse(resp) { fetchResponse = resp; },
    getFetchCalls() { return fetchCalls; }
  };
}

// ============================================================================
// 3. Follow-Up #1: Language Control Breakpoint Focus Transfer Tests
// ============================================================================
{
  const h = createHarness();
  const optTr = h.picker.querySelector('.lang-option[data-lang="tr"]');
  const desktopTr = h.desktopLangSwitch.querySelector('.lang-btn[data-lang="tr"]');
  const desktopEn = h.desktopLangSwitch.querySelector('.lang-btn[data-lang="en"]');
  const footerEn = h.footerLangSwitch.querySelector('.lang-btn[data-lang="en"]');

  // Case 1.1: At 1099px, open picker via keyboard, focus TR option (while currentLang is 'de'), resize to >=1100px
  h.doc.dispatchEvent({ type: 'keydown', key: 'Enter', bubbles: true });
  h.trigger.click();
  optTr.focus({ preventScroll: true });
  assert(!h.picker.hidden && h.doc.activeElement === optTr, 'Follow-up #1 setup: Picker is open and TR option has focus at 1099px');

  h.setViewportWide(true);
  assert(
    h.picker.hidden &&
    h.trigger.getAttribute('aria-expanded') === 'false' &&
    h.doc.activeElement === desktopTr &&
    desktopTr.lastFocusOptions &&
    desktopTr.lastFocusOptions.preventScroll === true &&
    h.doc.documentElement.lang === 'de' &&
    h.doc.body.style.overflow === '',
    'Follow-up #1 (1099 -> 1100px, option focused): Picker closes, focus moves to corresponding desktop TR button with preventScroll, language stays DE, scroll unlocked'
  );

  // Case 1.2: At 1100px, focus desktop TR button, resize to 1099px -> focus returns to mobile trigger
  desktopTr.focus({ preventScroll: true });
  h.setViewportWide(false);
  assert(
    h.doc.activeElement === h.trigger &&
    h.trigger.lastFocusOptions &&
    h.trigger.lastFocusOptions.preventScroll === true &&
    h.doc.documentElement.lang === 'de' &&
    h.doc.body.style.overflow === '',
    'Follow-up #1 (1100 -> 1099px, desktop button focused): Focus returns to mobile #langTrigger with preventScroll, language stays DE, scroll unlocked'
  );

  // Case 1.3: At 1099px, switch language to EN, focus closed #langTrigger, resize to 1100px -> focus moves to desktop EN button
  h.context.selectLanguage('en');
  h.trigger.focus({ preventScroll: true });
  assert(h.picker.hidden && h.doc.activeElement === h.trigger, 'Follow-up #1 setup: Closed #langTrigger has focus with currentLang=en');

  h.setViewportWide(true);
  assert(
    h.doc.activeElement === desktopEn &&
    desktopEn.lastFocusOptions &&
    desktopEn.lastFocusOptions.preventScroll === true &&
    h.doc.documentElement.lang === 'en',
    'Follow-up #1 (1099 -> 1100px, closed trigger focused): Focus moves to currently selected desktop EN button with preventScroll'
  );

  // Case 1.4: Focus elsewhere on the page (e.g. #cf-name or footer lang button) during 1099 <-> 1100px transitions
  h.setViewportWide(false);
  h.trigger.click(); // open picker
  h.nameInput.focus({ preventScroll: true });
  h.setViewportWide(true);
  assert(
    h.doc.activeElement === h.nameInput && h.picker.hidden,
    'Follow-up #1 (1099 -> 1100px, focus elsewhere on #cf-name): Focus stays on #cf-name'
  );

  footerEn.focus({ preventScroll: true });
  h.setViewportWide(false);
  assert(
    h.doc.activeElement === footerEn,
    'Follow-up #1 (1100 -> 1099px, focus on footer language button): Focus stays on footer button and does not jump to header trigger'
  );
}

// ============================================================================
// 4. Follow-Up #2: Missing Required vs. Malformed Optional/Required Phone Validation
// ============================================================================
{
  const h = createHarness();
  const { form, nameInput, emailInput, phoneInput, phoneLabel, phoneHint, phoneError } = h;
  const emailRadio = form.querySelector('input[name="Kontaktart"][value="E-Mail"]');
  const callbackRadio = form.querySelector('input[name="Kontaktart"][value="Rückruf"]');
  const whatsappRadio = form.querySelector('input[name="Kontaktart"][value="WhatsApp"]');
  const statusEl = form.querySelector('.form-status');

  // Attach an unrelated aria-describedby ID to verify it is preserved across all state changes
  phoneInput.setAttribute('aria-describedby', 'ext-phone-note');

  // Case 2.1: Default/email with no phone succeeds
  nameInput.value = 'Max Mustermann';
  emailInput.value = 'max@example.com';
  phoneInput.value = '';
  await h.submitForm();
  assert(
    h.getFetchCalls() === 1 &&
    statusEl.classList.contains('form-status-success') &&
    phoneError.hidden &&
    phoneInput.getAttribute('aria-describedby') === 'ext-phone-note',
    'Follow-up #2 (Default/email without phone): Submission succeeds and preserves unrelated aria-describedby token'
  );

  // Case 2.2: Callback/WhatsApp without a phone shows the required-number error (form_error_phone)
  nameInput.value = 'Max Mustermann';
  emailInput.value = 'max@example.com';
  phoneInput.value = '';
  callbackRadio.click();
  callbackRadio.dispatchEvent({ type: 'change', target: callbackRadio, bubbles: true });

  await h.submitForm();
  assert(
    h.getFetchCalls() === 1 &&
    !phoneError.hidden &&
    phoneError.getAttribute('data-i18n') === 'form_error_phone' &&
    phoneError.textContent === translations.de.form_error_phone &&
    phoneInput.getAttribute('aria-invalid') === 'true' &&
    phoneInput.getAttribute('aria-describedby') === 'ext-phone-note cf-phone-hint cf-phone-error' &&
    h.doc.activeElement === phoneInput,
    'Follow-up #2 (Callback without phone): Shows missing-required error (form_error_phone) with hint + error in aria-describedby and focuses #cf-phone'
  );

  // Case 2.3: Enter malformed nonempty number ('123') with Callback selected and submit -> shows form_error_phone_invalid
  phoneInput.value = '123';
  await h.submitForm();
  assert(
    h.getFetchCalls() === 1 &&
    !phoneError.hidden &&
    phoneError.getAttribute('data-i18n') === 'form_error_phone_invalid' &&
    phoneError.textContent === translations.de.form_error_phone_invalid &&
    phoneInput.value === '123' &&
    phoneInput.getAttribute('aria-describedby') === 'ext-phone-note cf-phone-hint cf-phone-error',
    'Follow-up #2 (Callback with malformed "123"): Shows format error (form_error_phone_invalid), not missing-number error'
  );

  // Case 2.4: Switch reply preference to E-Mail while '123' is present -> removes requiredness & refreshes error to form_error_phone_optional
  emailRadio.click();
  emailRadio.dispatchEvent({ type: 'change', target: emailRadio, bubbles: true });
  assert(
    !phoneInput.required &&
    !phoneInput.hasAttribute('aria-required') &&
    !phoneLabel.classList.contains('req') &&
    phoneHint.hidden &&
    !phoneError.hidden &&
    phoneError.getAttribute('data-i18n') === 'form_error_phone_optional' &&
    phoneError.textContent === translations.de.form_error_phone_optional &&
    phoneInput.value === '123' &&
    phoneInput.getAttribute('aria-describedby') === 'ext-phone-note cf-phone-error',
    'Follow-up #2 (Switch Callback -> E-Mail with "123"): Clears requiredness/hint and immediately refreshes error to form_error_phone_optional'
  );

  // Submitting while '123' is still in the optional phone field continues to show form_error_phone_optional
  await h.submitForm();
  assert(
    h.getFetchCalls() === 1 &&
    !phoneError.hidden &&
    phoneError.getAttribute('data-i18n') === 'form_error_phone_optional' &&
    phoneError.textContent === translations.de.form_error_phone_optional,
    'Follow-up #2 (Submit E-Mail with malformed "123"): Continues to show form_error_phone_optional explaining user can correct or clear it'
  );

  // Case 2.5: Switching language while form_error_phone_optional is visible updates its explanation in DE/EN/TR
  h.context.setLanguage('en', false);
  const enOptionalText = phoneError.textContent;
  h.context.setLanguage('tr', false);
  const trOptionalText = phoneError.textContent;
  h.context.setLanguage('de', false);
  const deOptionalText = phoneError.textContent;
  assert(
    enOptionalText === translations.en.form_error_phone_optional &&
    trOptionalText === translations.tr.form_error_phone_optional &&
    deOptionalText === translations.de.form_error_phone_optional,
    'Follow-up #2 (Language switch DE -> EN -> TR -> DE): Active phone error explanation translates in place'
  );

  // Case 2.6: Switching back to WhatsApp while '123' is present re-evaluates error back to form_error_phone_invalid and restores cf-phone-hint before cf-phone-error
  whatsappRadio.click();
  whatsappRadio.dispatchEvent({ type: 'change', target: whatsappRadio, bubbles: true });
  assert(
    phoneInput.required &&
    phoneInput.getAttribute('aria-required') === 'true' &&
    !phoneHint.hidden &&
    phoneError.getAttribute('data-i18n') === 'form_error_phone_invalid' &&
    phoneError.textContent === translations.de.form_error_phone_invalid &&
    phoneInput.getAttribute('aria-describedby') === 'ext-phone-note cf-phone-hint cf-phone-error',
    'Follow-up #2 (Switch E-Mail -> WhatsApp with "123"): Restores requiredness/hint and refreshes error back to form_error_phone_invalid'
  );

  // Switch back to E-Mail and clear phone -> clears error and permits submission
  emailRadio.click();
  emailRadio.dispatchEvent({ type: 'change', target: emailRadio, bubbles: true });
  phoneInput.value = '';
  phoneInput.dispatchEvent({ type: 'input', target: phoneInput, bubbles: true });
  assert(
    phoneError.hidden &&
    !phoneInput.hasAttribute('aria-invalid') &&
    phoneInput.getAttribute('aria-describedby') === 'ext-phone-note' &&
    !statusEl.classList.contains('form-status-error'),
    'Follow-up #2 (Clear optional phone on E-Mail): Clears phone error, aria-invalid, and form status error while keeping unrelated aria-describedby'
  );

  await h.submitForm();
  assert(
    h.getFetchCalls() === 2 && statusEl.classList.contains('form-status-success'),
    'Follow-up #2 (Submit after clearing optional phone): Submission succeeds'
  );

  // Case 2.7: Mocked network/HTTP 500 failure preserves user input, selected services, and package tag
  h.pkgLink.click();
  h.svcCheck.checked = true;
  nameInput.value = 'Erika Muster';
  emailInput.value = 'erika@example.com';
  whatsappRadio.click();
  whatsappRadio.dispatchEvent({ type: 'change', target: whatsappRadio, bubbles: true });
  phoneInput.value = '+49 155 63205346';
  h.setFetchResponse({ ok: false, status: 500 });

  await h.submitForm();
  assert(
    h.getFetchCalls() === 3 &&
    statusEl.classList.contains('form-status-error') &&
    statusEl.getAttribute('data-i18n') === 'form_error_send' &&
    !form.querySelector('button[type="submit"]').disabled &&
    nameInput.value === 'Erika Muster' &&
    phoneInput.value === '+49 155 63205346' &&
    h.svcCheck.checked &&
    !h.doc.getElementById('formPkg').hidden &&
    h.doc.getElementById('cf-pkg').value === 'Exklusiv',
    'Follow-up #2 (Mocked HTTP 500): Preserves user values, selected services, and package selection & re-enables submit button'
  );
}

console.log(`ALL FOLLOW-UP & STATIC CHECKS PASSED (${results.length} assertions):`);
for (const r of results) {
  console.log('  ' + r);
}
