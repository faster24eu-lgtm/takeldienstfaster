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
