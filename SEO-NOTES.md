# Faster SEO work

## V8 – Takeldienst Antwerpen landingspagina
- Reworked `/takeldienst/antwerpen/` around the primary intent: `takeldienst Antwerpen`.
- Added stronger local relevance: Antwerpen-Centrum, Kiel, Berchem, Borgerhout, Deurne, Merksem, Wilrijk, Hoboken, Ekeren, Linkeroever, plus Edegem and Wommelgem.
- Added unique service descriptions, road-context information, FAQ content, local business data, breadcrumb schema and FAQ schema.
- Kept contact details consistent: phone +32 3 375 67 37, WhatsApp +32 3 375 67 37, faster@takeldienst-depannage.com.
- Avoided unsupported fixed ETA claims. Response time is described as dependent on traffic, location, demand and vehicle availability.

## V9 – Internal links without text changes (2026-10-18)
Playbook: `SEO-STRATEGY-NO-BACKLINKS.md`. Owner rule for this pass: **no visible text may change**.
Data: Search Console property `https://takeldienstfaster.be/` (old domain of this same site; it no longer resolves since mid-October). 2026-08-29 to 2026-10-16: 81 pages, 5,563 impressions, 105 clicks. The new property `https://takeldienst-depannage.com/` only has data from 2026-10-14.

Baseline (impressions / avg. position; re-check from ~2026-11-08 on the new property):
| Page | Impr. | Pos. | Main queries (pos.) |
|---|---|---|---|
| / | 1,843 | 12.7 | takeldienst (14.9), takeldienst antwerpen (14.5), depannage antwerpen (14.8) |
| /takeldienst/antwerpen/ | 974 | 6.3 | takeldienst (8.7), takeldienst antwerpen (6.3), depannage antwerpen (10) |
| /takeldienst/gent/ | 476 | 11.6 | takeldienst gent (12.9), depannage gent (30) |
| /takeldienst/limburg/ | 319 | 8.5 | takeldienst limburg (8.7) |
| /takeldienst/aalst/ | 219 | 9.3 | takeldienst dendermonde (10.2), takeldienst aalst (11.1) |
| /takeldienst/west-vlaanderen/ | 145 | 9.6 | takeldienst oostende (8.7), takeldienst brugge (11.2) |
| /takeldienst/hasselt/ | 114 | 8.3 | takeldienst hasselt (9.5), depannage hasselt (9.9) |
| /index.html, /fr/index.html, /de/index.html | 46 / 61 / 9 | – | duplicates of /, /fr/, /de/ |

Done (`scripts/link-mentions.pl` + `scripts/link-mentions.txt`, rerunnable, all languages):
- Before: Gent, Aalst, West-Vlaanderen and Sint-Niklaas had 1 in-body link each, /depannage-vrachtwagen/ none.
- 71 new in-body links on 71 pages (NL, EN, FR, DE, PL, RO): the first unlinked mention of a city or service that is already in a `<p>`/`<li>` (e.g. "Gent" on the Aalst page, "Anvers" on French city pages) now links to that city page. Max 4 per page; pages that already link a target are skipped. Links carry `data-ml`.
- 288 internal links to `…/index.html` now point to the folder URL (`../../index.html` → `../../`), so `/index.html` and `/fr/index.html` stop competing with `/` and `/fr/`.
- Check: the visible text (HTML without tags) of all 147 changed files is identical to before; no new broken links.

Not possible under the no-text rule: anchor-text variation, new FAQs/sections, titles/meta for "takeldienst gent" (12.9) and "depannage gent" (30).
Most of the Dutch city pages only mention their own area, so the Dutch pass added just 12 links; the rest are on the language versions.
Open: the old domain takeldienstfaster.be does not resolve, so its rankings and any backlinks are not passed on. Renewing it and 301-redirecting every URL to takeldienst-depannage.com, then running Search Console "Change of address", would carry them over.

## V10 – Titles and two H1s from Search Console queries (2026-10-18, owner approved)
Only these texts changed; body text untouched.
- Gent: title "Takeldienst & Depannage Gent 24/7, vanaf €125" (was 73 chars with the phone number; og/twitter titles updated too), H1 "Takeldienst & depannage Gent 24/7" (was "Depannage Gent 24/7"). Queries: takeldienst gent 12.9, depannage gent 30.
- Antwerpen: H1 "Takeldienst & depannage Antwerpen 24/7" (was "Depannage Antwerpen 24/7"). Query: takeldienst antwerpen 6.3.
- Aalst: title "Takeldienst Aalst & Dendermonde 24/7 | Faster" (was 96 chars). Queries: takeldienst dendermonde 10.2, takeldienst aalst 11.1.
- West-Vlaanderen: title "Takeldienst West-Vlaanderen 24/7 | Brugge, Oostende, Kortrijk". Queries: takeldienst oostende 8.7, takeldienst brugge 11.2.
- Hasselt: title "Takeldienst & Depannage Hasselt 24/7, vanaf €125" (og/twitter too). Queries: takeldienst hasselt 9.5, depannage hasselt 9.9.
- Limburg: title "Takeldienst Limburg 24/7 | Hasselt, Genk, Sint-Truiden" (was 90 chars).
Homepage and Antwerpen title deliberately unchanged.

## V11 – Polish: "pomoc drogowa belgia" (2026-10-19, owner approved)
Search Console (Aug-Oct): ~59 impressions for "pomoc drogowa belgia", spread over /en/ (33, pos 65), /pl/takeldienst/antwerpen/ (7, pos 37), /pl/ (6, pos 49), /pl/takeldienst/aalst/ (4, pos 36), Limburg, Gent. The Polish pages never said "Belgia", only "Flandria".
- /pl/: title "Pomoc drogowa Belgia 24/7 – Antwerpia i Flandria | Faster", description "Pomoc drogowa w Belgii 24/7: …", H1 "Pomoc drogowa w Belgii, która naprawdę przyjeżdża." (og/twitter too). No claim that Polish is spoken (not stated anywhere on the site).
- hreflang: 22 Dutch pages listed nl/de/fr/en/pl but not ro, while the other languages did list ro; the ro return link is now added everywhere a ro page exists (no visible change).
Re-check from ~2026-11-08: which page Google shows for "pomoc drogowa belgia" (goal: /pl/).

## 2026-11-05: no price anywhere

Owner decision: no "vanaf €125" / "from €125" on any page, ad or listing any more (does not tow for that price, does not want price-hunting customers). Pages only say the price is agreed before the tow truck sets off. The titles above that still say "vanaf €125" are history.

## V12 – AI search (GEO) & local SEO pass (2026-11-07)
Owner request: make Faster easier to find and cite in ChatGPT Search, Google (AI Overviews, Maps), Copilot/Bing, Perplexity and Gemini, with Hoboken and Antwerpen first. No new prices, reviews, addresses or response-time promises; only facts already on the site.

Fixed
- Removed 9 stray uploads (`index (2|4|6|8|12|13|15|17|19).html`, `styles (11).css`, `README (9).md`, root `site.js`). They were live at URLs like `/index%20(17).html`, still showed the old €125 price and had broken links. Root `site.js` also had a syntax error.
- 24 location pages (Edegem, Hoboken, Wilrijk, Wommelgem in 6 languages) had empty call-button slots: no call button in the page body on desktop. Now filled with the same localized button as the other city pages.
- All 120 location pages: the empty header slot now shows the phone number on desktop (`.nav-call`, hidden below 640px where the floating call button already shows).
- 123 BreadcrumbList entries pointed to `/takeldienst/`, which did not exist (404). New hub page `/takeldienst/` (Werkgebied) fixes them and links every area page.
- Homepage FAQ schema did not match the visible FAQ (Google requires a match). Both now hold the same 12 questions.
- Homepage typo "Faster in een klein team" → "Faster is een klein team". FR services page had the same title as EN.
- Titles over 75 chars on Deurne, Merksem, Boom, Berchem, Kontich, Mortsel: only the brand suffix shortened to "| Faster"; keyword part unchanged.

Added
- `robots.txt`: everything still allowed; AI/search crawlers (OAI-SearchBot, ChatGPT-User, GPTBot, bingbot, Googlebot, Google-Extended, PerplexityBot, Perplexity-User, ClaudeBot, Claude-SearchBot, Claude-User, Applebot, Applebot-Extended) listed explicitly.
- `llms.txt`: plain summary of who Faster is, services, area, contact, how pricing works, main pages.
- Homepage: "Faster in het kort" block (wie / wat / waar / hoe aanvragen / prijs / waarom), 6 new FAQ answers (Hoboken/Antwerpen, how to arrange a tow, cost, non-running cars, international, urgent help), WhatsApp button + NAP line in the contact block, link to the Werkgebied hub, business schema with alternateName "Takeldienst Faster", description, extra areaServed and an OfferCatalog of the 6 services.
- `/takeldienst/hoboken/` rewritten (was ~150 words): grew-up-in-Hoboken / base-in-Kiel angle from the Antwerpen page, services, local streets (Kioskplaats, Kapelstraat, Sint-Bernardsesteenweg, De Zwaantjes, Hobokense Polder), neighbour links, safety, 8 FAQs; schema Service + WebPage + Breadcrumb + FAQPage. Title "Takeldienst & Depannage Hoboken 24/7 | Faster".
- `/takeldienst/wilrijk/` expanded the same way (6 FAQs).
- `assets/js/faster-track.js` on every page: see `AI-SEO-ACTIONS.md`. Existing Google Ads tag and conversions untouched.

Not touched: Antwerpen page text and title (ranks ~6, owner-written), other languages' content (only the call buttons).
Re-check in Search Console from ~2026-12-05: "takeldienst hoboken", "depannage hoboken", "takeldienst wilrijk", homepage CTR.

## V13 – audit 9 Nov 2026: languages, titles, new Antwerp pages (2026-11-09)
- Removed from indexing (redirect stubs + out of sitemap + out of hreflang): all /de/, /pl/, /ro/ pages and the /fr/, /en/ pages other than home, Antwerpen and Gent (125 pages). DE/PL/RO homes -> /en/; other removed pages -> the Dutch page on the same topic. List in the commit.
  Note: /pl/ was targeted on 19 Oct for "pomoc drogowa belgia" (V11); that page is now a redirect to /en/.
- 2026-11-09 (owner request): /pl/ homepage restored as a full page (V11 title/H1 kept, WebP logo, no DE/RO links), back in the sitemap and in hreflang/switcher on the NL, EN, FR and PL homes. The other /pl/ pages stay redirects to the Dutch pages.
- Home title: "Takeldienst Antwerpen 24/7 – depannage & pechhulp | Faster". /takeldienst/antwerpen/ title changed to "Depannage Antwerpen 24/7: Ring, tunnels & wijken | Faster" to avoid two pages with the same target.
- All indexable titles now <= 60 characters (17 shortened by hand).
- /ervaring-ionos/: noindex, out of the sitemap, footer link removed.
- Review-carousel dots: 24x24 px tap area. Logo: faster-logo.png (287 KB) -> faster-logo-360.webp (9 KB) / -720.webp (2x).
- Rewritten: /takeldienst/edegem/, /takeldienst/wommelgem/ (were ~150 words, 0.52 similar). Wilrijk cards/safety text rewritten (0.46 -> 0.26 vs Hoboken).
- New: /takeldienst/kennedytunnel-ring/, /takeldienst/ekeren-schoten-brasschaat-kapellen/, /depannage-haven-antwerpen/, /takeldienst-antwerpen-prijs/ (no prices, per the 5 Nov decision).
- Deleted the leftover /public/takeldienst-antwerpen/ and /public/takeldienst/deurne/ copies.
- OPEN (owner): NAP conflict. Footer and schema: De Bosschaertstraat 248, 2020 Antwerpen. The German Impressum (abschleppdienst-faster.de, abschleppdienstbredemeier.de) gives Boniverlei 172, 2650 Edegem as Geschäftssitz. Decide which address is the business address; not changed here.

- 2026-11-10 (owner request: "sometimes they bring customers"): all FR/EN/DE/PL/RO pages removed on 2026-11-09 are restored as they were (125 pages), with the WebP logo and review-dot fix. hreflang rebuilt from the pages that actually exist (25 groups, all reciprocal; thank-you pages and redirects have none). Sitemap back to 153 URLs. The new Dutch-only pages (Kennedytunnel, Ekeren, haven, prijs) have no translations. Risk to watch: the translated town pages are short (~240 words) and close to each other; check Search Console in a few weeks.
