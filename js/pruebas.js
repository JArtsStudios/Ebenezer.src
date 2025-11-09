const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");
const navbar = document.querySelector(".navbar");

// Mostrar/ocultar menú móvil
toggle.addEventListener("click", () => {
  nav.classList.toggle("show");
});

// Ocultar menú móvil al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      nav.classList.remove("show");
    }
  });
});

// Ocultar navbar al hacer scroll (en todos los dispositivos)
let lastScrollY = window.scrollY;
let ticking = false;

function handleScroll() {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY + 10) {
    navbar.classList.add("hidden"); // Oculta
  } else if (currentScrollY < lastScrollY - 10) {
    navbar.classList.remove("hidden"); // Muestra
  }

  lastScrollY = currentScrollY;
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(handleScroll);
    ticking = true;
  }
});
