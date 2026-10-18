# Hosting decision record

*Date: 2026-10-18. Facts verified on that date from the vendors' own terms, docs and pricing pages; data-protection status checked on the official EU–US Data Privacy Framework (DPF) list. Full research with quotes: [`research/hosting-options-2026-10-18.json`](research/hosting-options-2026-10-18.json).*

## Decision

**Stay on GitHub Pages for now.** It is free, fast and has run without problems. Do the two safety steps below.

**Plan a move to Cloudflare** (free plan) when one of these happens:

- the contact form moves off Formspree (Formspree is not DPF-certified, see `TODO.md`),
- GitHub objects to the site (see "Terms" below),
- preview links before going live or real security headers become important.

One move to Cloudflare would solve all of these at once, at no cost.

## Current setup (verified 2026-10-18)

| Item | State |
|---|---|
| Host | GitHub Pages, legacy branch build from `main` (path `/`), Jekyll with the `exclude` list in `_config.yml` |
| Domain | `www.elbcar-detailing.de` (file `CNAME`); `elbcar-detailing.de` and `http://` redirect with 301 to `https://www.` |
| DNS | GoDaddy (nameservers `ns35/ns36.domaincontrol.com`): four A records for `@` → `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`; `www` CNAME → `mashreghal.github.io`; no AAAA records |
| TLS | Certificate for both names, renewed automatically by GitHub (valid until 2027-01-08); "Enforce HTTPS" on |
| Deploys | Every merge to `main` goes live in 40–80 s. Changes go through a pull request (see "How a change goes live") |
| Contact form | Formspree (US) → the client's Gmail |
| Cost | USD 0 (GitHub Free, public repository) |

### How a change goes live

1. Work on a branch, check locally (headless Chrome scripts, form test with the network stubbed).
2. Push the branch and open a pull request with the GitHub CLI as the repository owner `mashreghal` (`gh auth switch -u mashreghal` if another account is active).
3. Merge, wait for the Pages build (about a minute), then check the live site.

## Known gaps on GitHub Pages

- **Terms (grey zone).** GitHub Pages is "intended to host static web pages, but primarily as a showcase for personal and organizational projects" and "not intended for or allowed to be used as a free web hosting service to run your online business, e-commerce site, or any other website that is primarily directed at either facilitating commercial transactions or providing commercial software as a service". The Acceptable Use Policy adds that content posted through Pages should not primarily be "advertising or promotional marketing". This site sells nothing online, but it does market a business. GitHub rarely acts on small sites like this, but it could.
- **Custom domain not verified.** There is no `_github-pages-challenge-mashreghal` TXT record. GitHub: domain takeovers "can happen when you delete your repository, when your billing plan is downgraded, or after any other change which unlinks the custom domain or disables GitHub Pages while the domain remains configured for GitHub Pages". Fix: see action 1.
- **Public repository.** On GitHub Free, Pages only publishes from a public repository, so the code, `TODO.md` and the git history (including photos removed from the site) are public. A private repository needs GitHub Pro (about USD 4 per month). The website itself stays public either way.
- **No preview links.** Every merge to `main` is live within a minute.
- **No custom HTTP headers.** No HSTS, Content-Security-Policy, X-Frame-Options etc. Meta tags cannot replace HSTS (RFC 6797 §8.5) or `frame-ancestors`.
- **No server-side code.** The contact form needs an outside service (today Formspree).
- **Data protection.** GitHub is active on the DPF list (listed as "GitHub"). GitHub's DPA only covers enterprise products, not personal Free/Pro accounts. The privacy policy names GitHub as host.

## Options compared

| | GitHub Pages (today) | Cloudflare (Pages / Workers) | Netlify | Azure Static Web Apps | Vercel |
|---|---|---|---|---|---|
| Business site on the free plan | Grey zone | Yes | Yes | Free plan is "for hobby/personal usage"; Standard "for production" | No (Hobby is non-commercial) |
| Cost for this site | USD 0 (USD 4/month for a private repo) | USD 0 | USD 0, but a hard monthly credit cap (see below) | Free: EUR 0; Standard: about EUR 7.92/month | Pro: USD 20/month |
| Private repository | Needs GitHub Pro | Yes (Pages) | Yes | Yes | Yes |
| Preview link per pull request | No | Yes | Yes, free | Yes (public on Free) | Yes |
| Security headers | No | Yes (`_headers`) | Yes (`_headers`) | Yes (`staticwebapp.config.json`) | Yes (`vercel.json`) |
| Apex domain with DNS at GoDaddy | Yes (A records, today) | **No**: nameservers must move to Cloudflare (registrar can stay GoDaddy) | Yes (A record `75.2.60.5`) | Workaround (GoDaddy forwarding apex → www) | Yes (A record) |
| Contact form without Formspree | No | Small Worker + Cloudflare Email Service (sending to verified own addresses is free) | Built-in Netlify Forms (free, unlimited) | Managed Azure Functions (HTTP only) | Functions |
| DPF / DPA | DPF active; no DPA for Free/Pro | DPF active; DPA automatic | DPF active; DPA automatic | DPF active; DPA automatic | DPF active; DPA on Pro |
| EU-only hosting | No | No (EU only as paid enterprise add-on) | No | Not confirmed | No |
| Move effort | none | about half a day + DNS wait | 2–4 hours + DNS wait | a few hours + DNS wait | about an hour + DNS wait |

### Why Cloudflare and not the others

- **Cloudflare:** free for business use, unlimited static traffic, previews, headers, and a small Worker can send the form by e-mail through Cloudflare (DPF-certified, DPA included). That closes the Formspree gap too. Trade-offs: the domain's nameservers move from GoDaddy to Cloudflare (free; GoDaddy stays registrar), and Cloudflare Pages only gets maintenance now ("Start new projects with Workers"). Pages also redirects `/impressum.html` to `/impressum`, so canonical URLs and the sitemap must be updated.
- **Netlify:** good fit (built-in forms, previews, apex via A record), but the free plan has a **hard** cap of 300 credits per month: each production deploy costs 15 credits, and when the credits run out the site shows "Site not available" until the next month. With this project's deploy frequency (54 commits to `main` in April 2026) a paid plan would be needed. Netlify "may shut down Free Usage Tier website projects without notice".
- **Azure Static Web Apps:** fine technically, but the Free plan is meant for personal projects, so a business site should use Standard (about EUR 7.92/month), and GoDaddy cannot do the apex record Azure wants.
- **Vercel:** Hobby is non-commercial only ("Advertising the sale of a product or service" counts as commercial), so Pro at USD 20/month would be needed. Its auto-detection treats the repo as a Jekyll site because of `_config.yml`.

## Action items

1. **Verify the domain with GitHub (free, about 5 minutes, recommended now).** GitHub → profile Settings → Pages → "Add a domain" → `elbcar-detailing.de`. GitHub shows a TXT record named `_github-pages-challenge-mashreghal`; add it at GoDaddy (DNS → Add record → TXT) and click "Verify". Keep the record.
2. **Optional: make the repository private (USD 4/month).** Order matters: first upgrade the `mashreghal` account to GitHub Pro, then switch the repository to private. Switching to private on Free unpublishes the site ("Any published GitHub Pages site will be automatically unpublished.") and leaves the domain open to takeover. Copies already cloned elsewhere cannot be recalled (0 forks today).
3. **Optional: IPv6 for the apex.** Add four AAAA records for `@`: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

## Notes for a future move

- Internal files (`TODO.md`, `README.md`, `docs/`, `tools/`) are kept off the website only by the `exclude` list in `_config.yml`, which only GitHub's Jekyll build reads. On any other host, publish from a folder that contains only the site, or delete those files from the deploy, otherwise they become public.
- Keep `https://www.elbcar-detailing.de/` as the canonical address; if a host strips `.html`, update `sitemap.xml`, canonical tags and internal links, and check that the old `.html` URLs redirect with 301.
- Cloudflare: plan the nameserver change at GoDaddy, then recreate the DNS records at Cloudflare before switching; delete the `www` CNAME to `mashreghal.github.io` before adding a Workers custom domain.
- The form replacement must keep the current behaviour: only name and e-mail required, honeypot field `_gotcha`, Reply-To set to the sender, German field labels in the e-mail, success and error messages in DE/EN/TR. Update the privacy policy (contact form section and US transfer) at the same time.

## Sources

GitHub: [Pages terms](https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features) · [Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) · [Acceptable Use Policies](https://docs.github.com/en/site-policy/acceptable-use-policies/github-acceptable-use-policies) · [Plans](https://docs.github.com/en/get-started/learning-about-github/githubs-plans) · [Verifying a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages) · [Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) · [Repository visibility](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility) · [HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)

Cloudflare: [Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/) · [Headers](https://developers.cloudflare.com/pages/configuration/headers/) · [Preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/) · [Email Service pricing](https://developers.cloudflare.com/email-service/platform/pricing/) · [Data localization](https://developers.cloudflare.com/data-localization/)

Netlify: [Credit-based plans](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/) · [How credits work](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/) · [External DNS](https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/) · [Deploy previews](https://docs.netlify.com/deploy/deploy-types/deploy-previews/) · [Functions configuration](https://docs.netlify.com/build/functions/configuration/)

Azure: [Pricing](https://azure.microsoft.com/en-us/pricing/details/app-service/static/) · [FAQ](https://learn.microsoft.com/en-us/azure/static-web-apps/faq) · [Apex domain with external DNS](https://learn.microsoft.com/en-us/azure/static-web-apps/apex-domain-external) · [Custom domain](https://learn.microsoft.com/en-us/azure/static-web-apps/custom-domain-external) · [Configuration](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration)

Vercel: [Response headers](https://vercel.com/docs/headers/response-headers) · [Add a domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain) · [Function regions](https://vercel.com/docs/functions/configuring-functions/region) · [Environments](https://vercel.com/docs/deployments/environments)

DPF list: [dataprivacyframework.gov/list](https://www.dataprivacyframework.gov/list)
