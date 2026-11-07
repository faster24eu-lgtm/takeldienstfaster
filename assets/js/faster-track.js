/*
 * Faster – contact & AI-referral tracking (no cookies set by this file).
 *
 * Works alongside the existing Google Ads tag in each page <head>; it does NOT
 * change or re-fire the Google Ads conversions (phone + WhatsApp) that are
 * already configured there.
 *
 * What it does:
 *  1. Detects visits that come from AI assistants (ChatGPT, Perplexity,
 *     Copilot, Gemini, Claude, ...) via the referrer or utm_source, and keeps
 *     that source for the rest of the browser session.
 *  2. On every tap on a phone, WhatsApp or e-mail link it pushes a
 *     "faster_contact_click" event to the dataLayer (usable by Google Tag
 *     Manager) and, once GA4 is configured below, sends a GA4 event.
 *  3. Sends a separate "faster_lead" event only ONCE per browser session, so
 *     several taps by the same visitor are not counted as several leads.
 *     Mark only "faster_lead" (not the click events) as a key event in GA4.
 *
 * To switch on Google Analytics 4: paste the Measurement ID (G-XXXXXXXXXX)
 * from GA4 > Admin > Data streams below. Nothing is sent to GA4 while empty.
 */
(function () {
  var GA4_ID = ''; // e.g. 'G-ABC123XYZ9'

  var AI_SOURCES = [
    ['chatgpt.com', 'chatgpt'], ['chat.openai.com', 'chatgpt'], ['openai.com', 'chatgpt'],
    ['perplexity.ai', 'perplexity'],
    ['copilot.microsoft.com', 'copilot'], ['copilot.cloud.microsoft', 'copilot'],
    ['gemini.google.com', 'gemini'], ['bard.google.com', 'gemini'],
    ['claude.ai', 'claude'], ['you.com', 'you'], ['poe.com', 'poe'],
    ['chat.deepseek.com', 'deepseek'], ['meta.ai', 'meta_ai'], ['grok.com', 'grok']
  ];

  function store(key, val) {
    try { if (val === undefined) return sessionStorage.getItem(key); sessionStorage.setItem(key, val); } catch (e) { return null; }
  }

  function matchAi(value) {
    if (!value) return '';
    value = String(value).toLowerCase();
    for (var i = 0; i < AI_SOURCES.length; i++) {
      var host = AI_SOURCES[i][0];
      if (value === host || value.slice(-host.length - 1) === '.' + host || value === AI_SOURCES[i][1]) return AI_SOURCES[i][1];
    }
    return '';
  }

  var aiSource = store('faster_ai_source') || '';
  if (!aiSource) {
    var utm = '';
    try { utm = new URLSearchParams(location.search).get('utm_source') || ''; } catch (e) {}
    var refHost = '';
    try { refHost = document.referrer ? new URL(document.referrer).hostname : ''; } catch (e) {}
    aiSource = matchAi(utm) || matchAi(refHost);
    if (aiSource) store('faster_ai_source', aiSource);
  }

  window.dataLayer = window.dataLayer || [];
  var hasGtag = typeof window.gtag === 'function';
  if (GA4_ID && !hasGtag) {
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    document.head.appendChild(s);
    hasGtag = true;
  }
  if (GA4_ID && hasGtag) {
    if (aiSource) window.gtag('set', 'user_properties', { ai_source: aiSource });
    window.gtag('config', GA4_ID, aiSource ? { ai_source: aiSource } : {});
  }

  if (aiSource) window.dataLayer.push({ event: 'faster_ai_referral', ai_source: aiSource });

  function send(name, params) {
    var p = {};
    for (var k in params) p[k] = params[k];
    p.event = name;
    window.dataLayer.push(p);
    if (GA4_ID && hasGtag) {
      var g = { send_to: GA4_ID, transport_type: 'beacon' };
      for (var j in params) g[j] = params[j];
      window.gtag('event', name, g);
    }
  }

  function methodOf(href) {
    if (/^tel:/i.test(href)) return 'phone';
    if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//i.test(href) || /^whatsapp:/i.test(href)) return 'whatsapp';
    if (/^mailto:/i.test(href)) return 'email';
    return '';
  }

  function placeOf(a) {
    if (a.closest('.call-fab, .mobile-bar')) return 'floating_button';
    if (a.closest('header, .header, .site-header')) return 'header';
    if (a.closest('footer')) return 'footer';
    var sec = a.closest('section');
    if (sec) return sec.id || (sec.className || 'section').split(' ')[0];
    return 'body';
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var method = methodOf(a.getAttribute('href') || '');
    if (!method) return;
    var params = {
      contact_method: method,
      link_location: placeOf(a),
      page_path: location.pathname,
      page_language: (document.documentElement.lang || 'nl').slice(0, 2),
      ai_source: aiSource || '(none)'
    };
    send('faster_contact_click', params);
    if (method !== 'email' && !store('faster_lead_sent')) {
      store('faster_lead_sent', method);
      send('faster_lead', params);
    }
  }, true);
})();
