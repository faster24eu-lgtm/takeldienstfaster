
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
    ].join('
');
    window.open('https://wa.me/32480204733?text=' + encodeURIComponent(message), '_blank', 'noopener');
  });
}

// Keep the mobile bar visible while allowing browser safe-area padding.
document.documentElement.style.setProperty('--safe-bottom', 'env(safe-area-inset-bottom, 0px)');
