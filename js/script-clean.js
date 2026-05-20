document.addEventListener('DOMContentLoaded', function () {
  // === 1. Header que se esconde al hacer scroll ===
  const header = document.querySelector('.main-header');
  let lastScrollTop = 0;
  const headerHeight = header ? header.offsetHeight : 0;

  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
      // Bajando → esconder header
      header.classList.remove('header-down');
      header.classList.add('header-up');
    } else {
      // Subiendo o arriba del todo → mostrar header
      header.classList.remove('header-up');
      header.classList.add('header-down');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Evita valores negativos al tirar del scroll (iOS)
  });

  // === 2. Menú lateral (hidden-bar) ===
  const menuOpener = document.querySelector('.hidden-bar-opener');
  const menuCloser = document.querySelector('.hidden-bar-closer');
  const menuBackdrop = document.querySelector('.menu-backdrop');
  const hiddenBar = document.querySelector('.hidden-bar');

  function closeMenu() {
    document.body.classList.remove('visible-sidebar');
    hiddenBar.classList.remove('visible-sidebar');
  }

  if (menuOpener) {
    menuOpener.addEventListener('click', () => {
      document.body.classList.add('visible-sidebar');
      hiddenBar.classList.add('visible-sidebar');
    });
  }
  if (menuCloser) menuCloser.addEventListener('click', closeMenu);
  if (menuBackdrop) menuBackdrop.addEventListener('click', closeMenu);

  // === 3. Info bar (barra lateral derecha) ===
  const infoBtn = document.querySelector('.info-btn');
  const infoCloser = document.querySelector('.info-bar .cross-icon');
  const infoBackdrop = document.querySelector('.info-back-drop');
  const infoBar = document.querySelector('.info-bar');

  function closeInfoBar() {
    document.body.classList.remove('side-content-visible');
    infoBar.classList.remove('side-content-visible');
  }

  if (infoBtn) {
    infoBtn.addEventListener('click', () => {
      document.body.classList.add('side-content-visible');
      infoBar.classList.add('side-content-visible');
    });
  }
  if (infoCloser) infoCloser.addEventListener('click', closeInfoBar);
  if (infoBackdrop) infoBackdrop.addEventListener('click', closeInfoBar);

  // === 4. Scroll to top ===
  const scrollTopBtn = document.querySelector('.scroll-to-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === 5. Animaciones WOW (ligero) ===
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.wow').forEach(el => {
    el.classList.remove('wow');
    observer.observe(el);
  });
});