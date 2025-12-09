// Función genérica para crear sliders
function createSlider({
  containerSelector,
  slidesSelector,
  dotsSelector,
  prevBtnSelector,
  nextBtnSelector,
  autoplayTime = 1000 // tiempo en ms (default 1s)
}) {
  const container = document.querySelector(containerSelector);
  const slidesEl = document.querySelector(slidesSelector);
  const slides = Array.from(document.querySelectorAll(`${slidesSelector} > *`));
  const dotsContainer = document.querySelector(dotsSelector);
  const prevBtn = document.querySelector(prevBtnSelector);
  const nextBtn = document.querySelector(nextBtnSelector);
  let current = 0;
  let autoPlay;

  function update() {
    slidesEl.style.transform = `translateX(-${current * 100}%)`;
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  // Crear dots dinámicamente
  slides.forEach((_, i) => {
    const d = document.createElement('span');
    d.className = 'dot';
    d.addEventListener('click', () => {
      current = i;
      update();
    });
    dotsContainer.appendChild(d);
  });

  // Botones flecha
  if (prevBtn) prevBtn.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    update();
  });
  if (nextBtn) nextBtn.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    update();
  });

  // Autoplay
  function startAutoplay() {
    autoPlay = setInterval(() => {
      current = (current + 1) % slides.length;
      update();
    }, autoplayTime);
  }
  function stopAutoplay() {
    clearInterval(autoPlay);
  }

  container.addEventListener('mouseenter', stopAutoplay);
  container.addEventListener('mouseleave', startAutoplay);

  // Teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
    if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
  });

  update();
  startAutoplay();
}

// Uso para Inicio
createSlider({
  containerSelector: '.inicio-slider',
  slidesSelector: '.inicio-slides',
  dotsSelector: '#inicio-dots',
  prevBtnSelector: '#inicio-prev',
  nextBtnSelector: '#inicio-next',
  autoplayTime: 2000 // 2 segundos
});

// Uso para Objetivos
createSlider({
  containerSelector: '.objectives-slider',
  slidesSelector: '.objectives-slides',
  dotsSelector: '#objectives-dots',
  prevBtnSelector: '#obj-prev',
  nextBtnSelector: '#obj-next',
  autoplayTime: 2000 // 2segundos
});


// Scroll Reveal genérico para todos los elementos con .scroll-reveal
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".scroll-reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible"); 
        // Si prefieres que se queden visibles una vez aparezcan, elimina esta línea
      }
    });
  }, { threshold: 0.2 }); // 20% del elemento visible activa la animación

  reveals.forEach(el => observer.observe(el));
});
