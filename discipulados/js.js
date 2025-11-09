
const BARRIOS = [
  {
    id: 'b1',
    nombre: 'Buenos Aires',
    grupos: [
      { nombre: 'Discipulado #1', direccion: 'Calle Principal 45, El Olivo, Honduras', lider: 'Rosa Martínez', sublider: 'Juan Pérez', lugar: 'Casa de HNo. Manuel' },

    ]
  },
  {
    id: 'b2',
    nombre: 'Senderos de la Cascada',
    grupos: [
      { nombre: 'Pequeños Discipulados', direccion: 'Barrio Nueva Esperanza, Lote 8, Honduras', lider: 'María Gómez', sublider: 'Luis Rivera', lugar: 'Casa de HNo. Roberto' }
    ]
  },
  {
    id: 'b3',
    nombre: 'Las Brisas',
    grupos: [
      { nombre: 'Familias La Fuente', direccion: 'Manzana 3 Casa 10, La Fuente, Honduras', lider: 'Elena Castillo', sublider: 'Pedro Silva', lugar: 'Casa de Sra. Marta' },
      { nombre: 'Célula Nocturna', direccion: 'Calle 7, Residencial La Fuente, Honduras', lider: 'Mateo Gómez', sublider: 'Clara Ruiz', lugar: 'Casa de HNo. Sergio' },
      { nombre: 'Mujeres en oración', direccion: 'Sector B, La Fuente, Honduras', lider: 'Gloria Santos', sublider: 'N/A', lugar: 'Casa de Sra. Lidia' }
    ]
  },
  {
    id: 'b4',
    nombre: 'Barrio Nuevo',
    grupos: [
      { nombre: 'Discipulado Primeros Pasos', direccion: 'Calle Central 101, Villa Bendición, Honduras', lider: 'Pedro Ortega', sublider: 'Diego Ramos', lugar: 'Casa de HNo. Alfredo' }
    ]
  },
  {
    id: 'b5',
    nombre: 'El Salamo',
    grupos: [
      { nombre: 'Célula Jóvenes Esperanza', direccion: 'Sector Alta, Calle 2, Honduras', lider: 'Sonia Vega', sublider: 'Andrés Fuentes', lugar: 'Casa de HNo. Marco' },
      { nombre: 'Discipulado Matutino', direccion: 'Camino Real 14, Esperanza Alta, Honduras', lider: 'Raúl Mendoza', sublider: 'Sara Nuñez', lugar: 'Casa de Sra. Carmen' }
    ]
  }
];

// Referencias DOM
const barriosList = document.getElementById('barriosList');
const detalleTitulo = document.getElementById('detalleTitulo');
const detalleSub = document.getElementById('detalleSub');
const gruposContainer = document.getElementById('gruposContainer');
const mapIframe = document.getElementById('mapIframe');

// Crea botones de barrios
function renderBarrios() {
  BARRIOS.forEach(b => {
    const btn = document.createElement('button');
    btn.className = 'btn-bar';
    btn.type = 'button';
    btn.textContent = b.nombre;
    btn.dataset.id = b.id;
    btn.addEventListener('click', () => showDetalle(b.id, btn));
    barriosList.appendChild(btn);
  });
}

// Muestra detalle del barrio seleccionado
function showDetalle(id, clickedBtn) {
  // marcar active
  document.querySelectorAll('.btn-bar').forEach(b => b.classList.remove('active'));
  if (clickedBtn) clickedBtn.classList.add('active');

  const barrio = BARRIOS.find(x => x.id === id);
  if (!barrio) return;

  detalleTitulo.textContent = barrio.nombre;
  detalleSub.textContent = `${barrio.grupos.length} discipulado(s) disponible(s).`;

  // Limpiar grupos
  gruposContainer.innerHTML = '';
  barrio.grupos.forEach((g, idx) => {
    const card = document.createElement('article');
    card.className = 'grupo-card';

    const title = document.createElement('h3');
    title.className = 'grupo-title';
    title.textContent = g.nombre + (barrio.grupos.length > 1 ? ` — Grupo ${idx+1}` : '');
    card.appendChild(title);

    const meta = document.createElement('p');
    meta.className = 'grupo-meta';
    meta.textContent = g.direccion;
    card.appendChild(meta);

    const ul = document.createElement('ul');
    ul.className = 'contact-list';
    ul.innerHTML = `<li><strong>Líder:</strong> ${g.lider}</li>
                    <li><strong>Sub-líder:</strong> ${g.sublider}</li>
                    <li><strong>Lugar:</strong> ${g.lugar}</li>`;
    card.appendChild(ul);

    const btnMapa = document.createElement('button');
    btnMapa.className = 'btn-mapa';
    btnMapa.type = 'button';
    btnMapa.textContent = 'Ver en mapa';
    btnMapa.addEventListener('click', () => loadMapForAddress(g.direccion));
    card.appendChild(btnMapa);

    gruposContainer.appendChild(card);
  });

  // Cargar primer grupo en el mapa por defecto
  if (barrio.grupos.length > 0) {
    loadMapForAddress(barrio.grupos[0].direccion);
  }
}

// Cargar iframe con dirección
function loadMapForAddress(address) {
  // Usamos la forma simple de Google Maps embed por query:
  // https://www.google.com/maps?q=ADDRESS&output=embed
  const q = encodeURIComponent(address);
  const src = `https://www.google.com/maps?q=${q}&output=embed`;
  mapIframe.src = src;
}

// Inicialización
renderBarrios();

// Opcional: seleccionar el primer barrio automaticamente al cargar
if (BARRIOS.length > 0) {
  const firstBtn = document.querySelector('.btn-bar');
  if (firstBtn) firstBtn.click();
}
