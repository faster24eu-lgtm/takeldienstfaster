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

// Language switcher. Dutch pages live at the root; every other language lives
// under /de/, /fr/, /en/, /pl/ and /ro/ and mirrors the Dutch URLs, so the
// switcher swaps the language prefix and keeps the rest of the path.
// Injected here so every page using this shared script gets the same
// component without duplicating the markup on each page.
(function () {
  var navActions = document.querySelector('.nav-actions');
  if (!navActions || navActions.querySelector('.lang-switcher')) return;

  var langs = [
    { code: 'nl', name: 'Nederlands', flag: '🇧🇪', label: 'Taal wijzigen, huidige taal Nederlands' },
    { code: 'fr', name: 'Français', flag: '🇧🇪', label: 'Changer de langue, langue actuelle français' },
    { code: 'en', name: 'English', flag: '🇬🇧', label: 'Change language, current language English' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', label: 'Sprache ändern, aktuelle Sprache Deutsch' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱', label: 'Zmień język, obecny język: polski' },
    { code: 'ro', name: 'Română', flag: '🇷🇴', label: 'Schimbați limba, limba curentă română' }
  ];
  var current = (document.documentElement.lang || 'nl').slice(0, 2);
  var cur = langs.filter(function (l) { return l.code === current; })[0] || langs[0];

  var path = location.pathname.replace(/index\.html$/, '');
  if (path.charAt(path.length - 1) !== '/') path += '/';
  var base = path.replace(/^\/(de|fr|en|pl|ro)(?=\/)/, '') || '/';

  var menuItems = langs.map(function (l) {
    var flag = '<span aria-hidden="true">' + l.flag + '</span>';
    if (l === cur) return '<button type="button" class="lang-switcher-item is-active">' + flag + l.name + '</button>';
    var href = l.code === 'nl' ? base : '/' + l.code + base;
    return '<a class="lang-switcher-item" href="' + href + '" hreflang="' + l.code + '" lang="' + l.code + '">' + flag + l.name + '</a>';
  }).join('');

  var wrap = document.createElement('div');
  wrap.className = 'lang-switcher';
  wrap.innerHTML =
    '<button type="button" class="lang-switcher-btn" aria-haspopup="true" aria-expanded="false" aria-label="' + cur.label + '">' +
      '<span aria-hidden="true">' + cur.flag + '</span><span class="lang-text">' + cur.code.toUpperCase() + '</span><span class="lang-caret" aria-hidden="true">▾</span>' +
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
