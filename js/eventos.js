const eventos = [
 {
    id: 1,
    titulo: "Santa Cena",
    descripcion: "Conmemoración del sacrificio de Cristo mediante pan y vino sagrado.",
    fecha: "2025-12-07T17:00:00",
    img: "../img/santacena.png"
  },
  {
    id: 2,
    titulo: "PROCLAMA PROFETICA 2026",
    descripcion: "¡Prepárate para recibir palabra, revelación y esperanza en Proclama Profética 2026!",
    fecha: "2025-12-31T19:30:00",
    img: "../img/Proclama.png"
  }
 
];

const grid = document.querySelector(".grid-eventos");

if (grid) {
  grid.innerHTML = "";

  eventos.forEach((ev, index) => {
    const card = document.createElement("article");
    card.className = "card";
    card.setAttribute("data-id", ev.id);

    const img = document.createElement("img");
    img.src = ev.img;
    img.alt = ev.titulo;
    img.loading = "lazy";
    img.style.cursor = "pointer";
    img.addEventListener("click", () => mostrarImagenGrande(ev.img));

    const contenido = document.createElement("div");
    contenido.className = "contenido";

    const h3 = document.createElement("h3");
    h3.textContent = ev.titulo;

    const p = document.createElement("p");
    p.textContent = ev.descripcion;

    const fecha = document.createElement("span");
    fecha.className = "fecha";
    fecha.textContent = ev.fecha.split("T")[0];

    const contador = document.createElement("div");
    contador.className = "contador";

    contenido.appendChild(h3);
    contenido.appendChild(p);
    contenido.appendChild(fecha);
    contenido.appendChild(contador);

    card.appendChild(img);
    card.appendChild(contenido);
    grid.appendChild(card);

    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 80 * index + 60);

    startCountdown(ev.fecha, contador);
  });
}

function startCountdown(fechaEvento, contenedor) {
  const target = new Date(fechaEvento).getTime();

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = target - now;

    if (distance <= 0) {
      clearInterval(interval);
      contenedor.innerHTML = '';
      const btn = document.createElement("button");
      btn.textContent = "Ir al Evento";
      btn.className = "contador-boton";
      btn.addEventListener("click", () => window.location.href = "../multimedia/");
      contenedor.appendChild(btn);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    contenedor.textContent = `Faltan ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
}

function mostrarImagenGrande(url) {
  const overlay = document.createElement("div");
  overlay.className = "imagen-overlay";

  const img = document.createElement("img");
  img.src = url;
  img.alt = "Imagen del evento";

  overlay.appendChild(img);
  document.body.appendChild(overlay);

  overlay.addEventListener("click", () => {
    document.body.removeChild(overlay);
  });
}
