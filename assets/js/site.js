
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
    window.open('https://wa.me/3233756737?text=' + encodeURIComponent(message), '_blank', 'noopener');
  });
}

// Keep the mobile bar visible while allowing browser safe-area padding.
document.documentElement.style.setProperty('--safe-bottom', 'env(safe-area-inset-bottom, 0px)');

// Language switcher (UI only for now - Nederlands is the active language;
// Français and English are visual placeholders until those pages exist).
// Injected here so every page using this shared script gets the same
// component without duplicating the markup on each page.
(function () {
  var navActions = document.querySelector('.nav-actions');
  if (!navActions || navActions.querySelector('.lang-switcher')) return;

  var wrap = document.createElement('div');
  wrap.className = 'lang-switcher';
  wrap.innerHTML =
    '<button type="button" class="lang-switcher-btn" aria-haspopup="true" aria-expanded="false" aria-label="Taal wijzigen, huidige taal Nederlands">' +
      '<span aria-hidden="true">🇧🇪</span><span class="lang-text">NL</span><span class="lang-caret" aria-hidden="true">▾</span>' +
    '</button>' +
    '<div class="lang-switcher-menu" hidden>' +
      '<button type="button" class="lang-switcher-item is-active"><span aria-hidden="true">🇧🇪</span>Nederlands</button>' +
      '<span class="lang-switcher-item is-disabled" aria-disabled="true"><span aria-hidden="true">🇫🇷</span>Français<small>Binnenkort</small></span>' +
      '<span class="lang-switcher-item is-disabled" aria-disabled="true"><span aria-hidden="true">🇬🇧</span>English<small>Binnenkort</small></span>' +
    '</div>';

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
