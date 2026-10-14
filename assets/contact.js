/* Static-site contact: prepares an email; the visitor sends it in their mail app. */
(() => {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const status = document.getElementById('formSuccess');
  const draftLink = document.getElementById('emailDraftLink');
  const copyButton = document.getElementById('copyRequest');
  const recipient = 'info@vittoriomassa.it';
  let draft = '';
  const error = (input, invalid) => {
    input.closest('.field').classList.toggle('error', invalid);
    input.setAttribute('aria-invalid', String(invalid));
  };
  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = form.elements.name, email = form.elements.email, message = form.elements.message;
    error(name, !name.value.trim());
    error(email, !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim()));
    error(message, message.value.trim().length < 10);
    const invalid = form.querySelector('[aria-invalid="true"]');
    if (invalid) { invalid.focus(); return; }
    const course = form.elements.corso.value;
    draft = `Ciao Vittorio,\nvorrei organizzare la prima lezione gratuita.\n\nNome: ${name.value.trim()}\nEmail di risposta: ${email.value.trim()}\nCorso: ${course}\nLivello: ${form.elements.livello.value}\n\n${message.value.trim()}`;
    draftLink.href = `mailto:${recipient}?subject=${encodeURIComponent('Prima lezione — ' + course)}&body=${encodeURIComponent(draft)}`;
    status.classList.add('show');
    draftLink.click();
  });
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(draft);
      copyButton.textContent = 'Testo copiato';
    } catch (_) {
      const text = document.getElementById('emailDraftText');
      text.hidden = false; text.value = draft; text.focus(); text.select();
      copyButton.textContent = 'Seleziona e copia il testo qui sotto';
    }
  });
  form.querySelectorAll('input[type="text"], input[type="email"], textarea').forEach(input => {
    input.addEventListener('input', () => { error(input, false); status.classList.remove('show'); copyButton.textContent = 'Copia il messaggio'; });
  });
})();
