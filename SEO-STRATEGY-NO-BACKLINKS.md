# Ranking without backlinks: the Faster playbook (all sites)

Source: Kasra Dash, "How I Rank Pages Without Backlinks in 2026" (youtube.com/watch?v=ELg8zqUSm2c), applied to our own Search Console data.
Written 2026-10-18. First applied to abschleppdienst-faster.de (log: `faster-abschleppdienst-koeln/SEO-ROADMAP.md`, cycle 45).

## The idea in one paragraph
Google ranks on three pillars: **content / topical authority**, **backlinks / domain authority**, **technical / site architecture** (crawl, index, internal links). No site scores 100 on all three. We have almost no backlinks, so we must win on the other two. We don't have to be perfect, only **better than the 3 pages currently ranking** for each query. Pages that already sit on **positions 5–20** are the cheapest wins: Google already finds them relevant and needs a bit more signal.

## The 7 rules
1. **Start from Search Console, not from ideas.** For every page: which queries does it already show up for, at which position? Those queries are the page's real keyword list.
2. **Work the striking-distance pages first** (avg. position 5–20, or high impressions at 20–60). Ignore pages with no impressions until the striking-distance pages are done.
3. **Put the queries into the page.** Every relevant query the page appears for should be answered in the content: in an H2, a sentence, or an FAQ question in the searcher's own wording ("darf man ein Automatikauto abschleppen", "wohnmobil abschleppdienst"). Fix the title/meta when the page ranks 1–5 but gets no clicks.
4. **Vary internal anchor text.** If every link to a page says the same words, the page only ranks for those words. Rewrite inbound anchors to rotate through the page's GSC query variants (keep ~1/3 exact). Anchor text should be a natural noun phrase that still fits the sentence.
5. **Give weak pages more internal links.** Any page with impressions but < 5 inbound body links gets links from 3–6 topically related pages (same cluster), with query-based anchors. Pages that need to rank must not depend on nav/footer links alone.
6. **Beat competitors on completeness, not on length.** Look at the top 3 for the main query: which questions, entities (things/terms/places that belong to the topic) and formats (tables, images, FAQ, steps) do they have? Add what they lack. Short, direct FAQ answers (first sentence answers the question) so Google and LLMs can quote them.
7. **Site-wide, not page-by-page.** One great page on a weak site doesn't rank. Apply the same pass to every cluster. Thin or generic AI-style pages pull the whole site down: expand or merge them.

## The loop (per site, repeat every 2–4 weeks)
| Step | What | Tool |
|---|---|---|
| 1 | Export page × query (last 3 months) from Search Console | GSC API (Composio `GOOGLE_SEARCH_CONSOLE_SEARCH_ANALYTICS_QUERY`, dimensions `page,query`) |
| 2 | Rank pages: striking distance (pos 5–20) first, then high impressions at pos 20–60 | sort by impressions × position band |
| 3 | For each target page: list queries, inbound links and anchor texts | `faster-abschleppdienst-koeln/scripts/anchor-variants.pl` (inbound report) |
| 4 | Content pass: answer missing queries, add entities, FAQ, table/steps; fix title/meta if CTR is 0 at a good position | edit page |
| 5 | Anchor pass: rotate inbound anchors through query variants; add links to pages with < 5 inbound | `anchor-variants.pl` (rerunnable) |
| 6 | Log what changed with the date, re-check the same pages in GSC after 2–4 weeks | SEO-ROADMAP / SEO-NOTES |

## Ground rules (unchanged)
No invented prices, response times, reviews, addresses or statistics. Facts in new content must come from a source or from the owner. No doorway pages: a new section or FAQ is only added if it answers a real query.

## Site status
| Site | GSC property | Status |
|---|---|---|
| abschleppdienst-faster.de | sc-domain:abschleppdienst-faster.de | Cycle 45 done 2026-10-18 (see SEO-ROADMAP.md) |
| takeldienst-depannage.com (was takeldienstfaster.be) | https://takeldienstfaster.be/ (history), https://takeldienst-depannage.com/ | Internal links only (owner: no text changes), 2026-10-18, see SEO-NOTES.md V9 |
| sleepdienstfaster.nl | https://sleepdienstfaster.nl/ | Internal links 2026-10-18 (1 week of GSC data, too early for titles), see `_build/SEO-NOTES.md` |
| fasterbreakdownrecovery.co.uk | https://fasterbreakdownrecovery.co.uk/ | Internal links + clean hub URLs 2026-10-18 (too little GSC data for the query part yet), see `_build/SEO-NOTES.md` |
| autoopkoper.com | https://autoopkoper.com/ | to do |
| depannageplusvite.fr | https://depannageplusvite.fr/ | domain does not resolve (footer link removed) |
