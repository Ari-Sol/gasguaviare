// Slider Inicio
const inicioSlides = document.querySelector('.inicio-slides');
const inicioDots = document.getElementById('inicio-dots');
const inicioSlideCount = document.querySelectorAll('.inicio-slide').length;
let inicioIndex = 0;

// Crear dots
for (let i = 0; i < inicioSlideCount; i++) {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToInicioSlide(i));
  inicioDots.appendChild(dot);
}

function goToInicioSlide(index) {
  inicioIndex = index;
  inicioSlides.style.transform = `translateX(-${index * 100}%)`;
  document.querySelectorAll('#inicio-dots .dot').forEach((d,i) => {
    d.classList.toggle('active', i === index);
  });
}

// Botones
document.getElementById('inicio-prev').addEventListener('click', () => {
  inicioIndex = (inicioIndex > 0) ? inicioIndex - 1 : inicioSlideCount - 1;
  goToInicioSlide(inicioIndex);
});
document.getElementById('inicio-next').addEventListener('click', () => {
  inicioIndex = (inicioIndex < inicioSlideCount - 1) ? inicioIndex + 1 : 0;
  goToInicioSlide(inicioIndex);
});

// Autoplay cada 5 segundos
setInterval(() => {
  inicioIndex = (inicioIndex < inicioSlideCount - 1) ? inicioIndex + 1 : 0;
  goToInicioSlide(inicioIndex);
}, 1600);



// Slider Description/Historia (prev/next/dots/keyboard)
document.addEventListener('DOMContentLoaded', function(){
  const slidesEl = document.querySelector('.slides');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const dotsContainer = document.getElementById('dots');
  let current = 0;

  function update(){
    if (!slidesEl) return;
    slidesEl.style.transform = `translateX(-${current * 100}%)`;
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((d,i)=> d.classList.toggle('active', i===current));
  }

  slides.forEach((_,i)=>{
    const d = document.createElement('span');
    d.className = 'dot';
    d.addEventListener('click', ()=>{ current = i; update(); });
    dotsContainer.appendChild(d);
  });

  update();

  if (next) next.addEventListener('click', ()=>{ current = (current + 1) % slides.length; update(); });
  if (prev) prev.addEventListener('click', ()=>{ current = (current - 1 + slides.length) % slides.length; update(); });

  // keyboard support
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowRight' && next) next.click();
    if(e.key === 'ArrowLeft' && prev) prev.click();
  });
});

// Slider Objetivos (autoplay cada 1s, pausa al pasar mouse/interactuar en el apartado)
document.addEventListener('DOMContentLoaded', function(){
  const slidesEl = document.querySelector('.objectives-slides');
  const slides = Array.from(document.querySelectorAll('.objective-slide'));
  const dotsContainer = document.getElementById('objectives-dots');
  let current = 0;

  function update(){
    slidesEl.style.transform = `translateX(-${current * 100}%)`;
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((d,i)=> d.classList.toggle('active', i===current));
  }

  // Crear dots
  slides.forEach((_,i)=>{
    const d = document.createElement('span');
    d.className = 'dot';
    d.addEventListener('click', ()=>{ 
      current = i; 
      update(); 
    });
    dotsContainer.appendChild(d);
  });

  // Botones flecha
  document.getElementById('obj-prev').addEventListener('click', ()=>{
    current = (current - 1 + slides.length) % slides.length;
    update();
  });

  document.getElementById('obj-next').addEventListener('click', ()=>{
    current = (current + 1) % slides.length;
    update();
  });

  update(); // inicializa
});

// Animación de aparición al hacer scroll
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".scroll-reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible"); // se quita al salir
      }
    });
  }, { threshold: 0.2 });

  reveals.forEach(el => observer.observe(el));
});

