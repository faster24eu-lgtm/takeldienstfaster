// Google Ads conversion: WhatsApp klik (every link to wa.me and the quote form that opens WhatsApp)
function trackWhatsApp() {
  if (typeof gtag === 'function') { gtag('event', 'conversion', {'send_to': 'AW-10963026341/GaNaCICrtIYdEKWDyuso'}); }
}
document.addEventListener('click', function (e) {
  var a = e.target && e.target.closest ? e.target.closest('a[href*="wa.me"]') : null;
  if (a) { trackWhatsApp(); }
}, true);


document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute('href');
  if (id === '#') return;
  const target = document.querySelector(id);
  if (target) { e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
});

const quoteForm = document.querySelector('#quote-form');
if (quoteForm) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(quoteForm);
    const message = [
      'Hallo Faster, ik wil graag informatie/offerte voor mijn voertuig.',
      '',
      `Naam: ${form.get('name') || ''}`,
      `Telefoon: ${form.get('phone') || ''}`,
      `Waar sta ik: ${form.get('pickup') || ''}`,
      `Bestemming: ${form.get('dropoff') || ''}`,
      `Voertuig: ${form.get('vehicle') || ''}`,
      `Situatie: ${form.get('problem') || ''}`
    ].join('\n');
    trackWhatsApp();
    window.open('https://wa.me/3233756737?text=' + encodeURIComponent(message), '_blank', 'noopener');
  });
}

// Keep the mobile bar visible while allowing browser safe-area padding.
document.documentElement.style.setProperty('--safe-bottom', 'env(safe-area-inset-bottom, 0px)');

// Language switcher. Nederlands and Deutsch lead to real pages (the German
// section lives under /de/ and mirrors the Dutch URLs); Français and English
// are still placeholders on these pages (those languages only have a homepage).
// Injected here so every page using this shared script gets the same
// component without duplicating the markup on each page.
(function () {
  var navActions = document.querySelector('.nav-actions');
  if (!navActions || navActions.querySelector('.lang-switcher')) return;

  var isDe = (document.documentElement.lang || '').slice(0, 2) === 'de';
  var path = location.pathname.replace(/index\.html$/, '');
  if (path.charAt(path.length - 1) !== '/') path += '/';

  var nlUrl = '/';
  var deUrl = '/de/';
  if (isDe) {
    nlUrl = path.replace(/^\/de(?=\/)/, '') || '/';
  } else if (/^\/(diensten|takeldienst\/[^\/]+|verhalen\/[^\/]+)\/$/.test(path)) {
    deUrl = '/de' + path;
  }

  var flagBE = '<span aria-hidden="true">🇧🇪</span>';
  var flagDE = '<span aria-hidden="true">🇩🇪</span>';
  var soon = isDe ? 'Demnächst' : 'Binnenkort';
  var placeholders =
    '<span class="lang-switcher-item is-disabled" aria-disabled="true"><span aria-hidden="true">🇫🇷</span>Français<small>' + soon + '</small></span>' +
    '<span class="lang-switcher-item is-disabled" aria-disabled="true"><span aria-hidden="true">🇬🇧</span>English<small>' + soon + '</small></span>';

  var label = isDe ? 'Sprache ändern, aktuelle Sprache Deutsch' : 'Taal wijzigen, huidige taal Nederlands';
  var menuItems = isDe
    ? '<a class="lang-switcher-item" href="' + nlUrl + '" hreflang="nl" lang="nl">' + flagBE + 'Nederlands</a>' +
      '<button type="button" class="lang-switcher-item is-active">' + flagDE + 'Deutsch</button>' + placeholders
    : '<button type="button" class="lang-switcher-item is-active">' + flagBE + 'Nederlands</button>' +
      '<a class="lang-switcher-item" href="' + deUrl + '" hreflang="de" lang="de">' + flagDE + 'Deutsch</a>' + placeholders;

  var wrap = document.createElement('div');
  wrap.className = 'lang-switcher';
  wrap.innerHTML =
    '<button type="button" class="lang-switcher-btn" aria-haspopup="true" aria-expanded="false" aria-label="' + label + '">' +
      (isDe ? flagDE : flagBE) + '<span class="lang-text">' + (isDe ? 'DE' : 'NL') + '</span><span class="lang-caret" aria-hidden="true">▾</span>' +
    '</button>' +
    '<div class="lang-switcher-menu" hidden>' + menuItems + '</div>';

  navActions.insertBefore(wrap, navActions.firstChild);

  var btn = wrap.querySelector('.lang-switcher-btn');
  var menu = wrap.querySelector('.lang-switcher-menu');
  var active = wrap.querySelector('.lang-switcher-item.is-active');

  function closeMenu() {
    btn.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
  }
  function toggleMenu() {
    var open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    menu.hidden = open;
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMenu();
  });
  active.addEventListener('click', function (e) {
    e.stopPropagation();
    closeMenu();
  });
  document.addEventListener('click', closeMenu);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
})();
