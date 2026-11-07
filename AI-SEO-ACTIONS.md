# AI search & local SEO: what still needs the owner

These steps need logins to Google, Microsoft or other accounts. Claude could not do them from the code. Change log: `SEO-NOTES.md` V12.

## 1. Google Business Profile (biggest effect on Maps and "takeldienst Hoboken")
- Check that name, phone (03 375 67 37), website (https://takeldienst-depannage.com/) and category match the site exactly. Main category: "Takeldienst" (Towing service). Extra: "Pechhulpdienst" (Roadside assistance service), "Autotransport" if offered.
- Set the profile as a **service-area business**. Add service areas: Antwerpen, Hoboken, Wilrijk, Berchem, Deurne, Merksem, Mortsel, Edegem, Kontich, Boom, Hemiksem, Aartselaar. Hide the street address if customers cannot visit it.
- Hours: open 24 hours, 7 days.
- Add the services (pechverhelping, takelen, transport niet-rijdende wagens, bestelwagens, internationaal) and recent photos of the truck at work.
- Ask every happy customer for a review; reply to every review. Mentioning the place ("in Hoboken") in your reply helps.
- Send the share link of the profile (e.g. `https://maps.app.goo.gl/...` or `https://g.page/...`). It should go into the website schema as `sameAs` and replace the "Bekijk reviews" Google-search link.

## 2. Old domain takeldienstfaster.be
It no longer resolves, so its Search Console history and any backlinks are lost. Renew it, 301-redirect every URL to the same path on takeldienst-depannage.com, then run Search Console "Change of address".

## 3. Google Search Console
- Submit `https://takeldienst-depannage.com/sitemap.xml` again (new hub page `/takeldienst/`).
- URL Inspection → Request indexing for: `/`, `/takeldienst/`, `/takeldienst/hoboken/`, `/takeldienst/wilrijk/`.
- Remove the old upload URLs if they show up (Removals tool): `/index%20(17).html`, `/index%20(19).html` and the other `index%20(N).html`.

## 4. Bing Webmaster Tools (feeds Microsoft Copilot and is used by ChatGPT Search)
The site is already verified (msvalidate tag). Submit the sitemap, use "URL submission" (or IndexNow) for the 4 pages above, and import the site into **Bing Places for Business** with the same data as Google Business Profile.

## 5. Analytics
Currently on the site: only the Google Ads tag `AW-18517785509`, with conversions "Bel nu klik BE" (phone, every page) and the WhatsApp conversion (only on `/takeldienst-dringend/`). There is **no Google Analytics 4** and no Google Tag Manager. These were not changed.

New: `assets/js/faster-track.js` (loaded on every page). It sends:
| Event | When | Parameters |
|---|---|---|
| `faster_contact_click` | every tap on a phone, WhatsApp or e-mail link | `contact_method` (phone/whatsapp/email), `link_location`, `page_path`, `page_language`, `ai_source` |
| `faster_lead` | the first phone or WhatsApp tap in a browser session only | same |
| `faster_ai_referral` | visit from an AI assistant | `ai_source` (chatgpt, perplexity, copilot, gemini, claude, ...) |

It detects AI visits from the referrer (chatgpt.com, perplexity.ai, copilot.microsoft.com, gemini.google.com, claude.ai, ...) or `utm_source=chatgpt.com` (ChatGPT adds this to its links) and remembers the source for the session.

To switch on GA4:
1. Create a GA4 property and a web data stream for takeldienst-depannage.com.
2. Paste the Measurement ID (`G-...`) into `GA4_ID` at the top of `assets/js/faster-track.js` and publish.
3. In GA4 → Admin → Key events, mark **only `faster_lead`** as a key event (not `faster_contact_click`), so one visitor tapping three times counts as one lead.
4. Admin → Custom definitions: add event-scoped dimensions `contact_method`, `link_location`, `ai_source` and a user-scoped `ai_source`.
5. AI traffic report: Reports → Acquisition → Traffic acquisition, filter "Session source" matches regex `chatgpt|openai|perplexity|copilot|gemini|claude`, or use the `ai_source` dimension.
6. Link GA4 to Google Ads, but keep the existing Ads phone conversion as the Ads conversion and do not also import `faster_lead` as a primary Ads conversion, or calls get counted twice.

In Google Ads, set both existing conversion actions to **Count: One** if they are not already.

"Successful enquiry" (a real paid job) cannot be measured on the website, because the deal happens on the phone. Options: Google Ads call conversions with a minimum call length (e.g. 60 seconds) via a Google forwarding number, or upload completed jobs to Google Ads as offline conversions.

## 6. Owner facts that would make pages stronger
Only add these if true; nothing was invented:
- Company number (KBO/BTW) for the footer and schema.
- Year Faster started (as a company).
- Exact equipment (e.g. flatbed/plateauwagen, maximum weight).
- Real interventions in Hoboken, Wilrijk, Berchem etc. (like the Smiling Barista story), with photos.
- Whether Faster works with insurers or roadside-assistance companies.
- Languages spoken on the phone.
