/*
  PERSONALIZAÇÃO DO CONTATO
  Insira seu e-mail comercial ou número de WhatsApp para ativar o botão
  principal de contato. Nunca publique chaves, tokens ou senhas aqui.
  Exemplo: email: 'contato@seudominio.com.br'
  Exemplo: whatsapp: '5521999999999' (apenas números, com DDI)
*/
const PORTFOLIO_CONTACT = {
  email: '',
  whatsapp: ''
};

(function () {
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const readingFill = document.getElementById('reading-progress-fill');
  const year = new Date().getFullYear();
  document.querySelectorAll('#year,.year-copy').forEach(el => el.textContent = year);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const targets = entries.filter(e => e.isIntersecting);
      if (!targets.length) return;
      targets.sort((a,b) => b.intersectionRatio - a.intersectionRatio);
      const id = targets[0].target.id;
      navLinks.forEach(link => {
        const active = link.getAttribute('href') === '#' + id;
        link.classList.toggle('active', active);
        if(active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, {rootMargin:'-10% 0px -35% 0px', threshold:[0,.15,.4,.7]});
    sections.forEach(section => observer.observe(section));
  }
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (readingFill) readingFill.style.width = (max > 0 ? (scrollY/max)*100 : 0) + '%';
  };
  addEventListener('scroll', updateProgress, {passive:true});
  addEventListener('resize', updateProgress, {passive:true});
  updateProgress();

  if (matchMedia('(min-width:801px) and (prefers-reduced-motion:no-preference)').matches) {
    let lastEvent = 0;
    window.addEventListener('pointermove', event => {
      if (Date.now() - lastEvent < 50) return;
      lastEvent = Date.now();
      document.documentElement.style.setProperty('--mouse-x', event.clientX + 'px');
      document.documentElement.style.setProperty('--mouse-y', event.clientY + 'px');
    }, {passive:true});
  }

  const contact = document.querySelector('.contact-actions .primary-btn');
  const note = document.querySelector('.contact-note');
  if (PORTFOLIO_CONTACT.whatsapp.trim()) {
    const number = PORTFOLIO_CONTACT.whatsapp.replace(/[^\d]/g, '');
    contact.href = `https://wa.me/${number}?text=${encodeURIComponent('Olá, Victor! Conheci seu portfólio e gostaria de conversar sobre um projeto.')}`;
    contact.innerHTML = 'Solicitar um orçamento <span aria-hidden="true">↗</span>';
    contact.setAttribute('aria-label','Conversar pelo WhatsApp sobre um projeto');
    if (note) note.hidden = true;
  } else if (PORTFOLIO_CONTACT.email.trim()) {
    contact.href = `mailto:${PORTFOLIO_CONTACT.email.trim()}?subject=${encodeURIComponent('Orçamento de projeto digital')}&body=${encodeURIComponent('Olá, Victor! Conheci seu portfólio e gostaria de conversar sobre um projeto.')}`;
    contact.removeAttribute('target');contact.removeAttribute('rel');
    contact.innerHTML = 'Solicitar um orçamento <span aria-hidden="true">↗</span>';
    if (note) note.hidden = true;
  }
})();
