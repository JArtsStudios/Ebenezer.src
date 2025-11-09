const BARRIOS = [
  {
    id: 'b1',
    nombre: 'Buenos Aires',
    grupos: [
      { 
        nombre: 'Discipulado #1', 
        iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1363.3793864655754!2d-89.09731436833742!3d14.869014307503466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f63dd000866393b%3A0x9ea964e226e7082c!2sDiscipulado%20%231!5e0!3m2!1ses!2shn!4v1762716861458!5m2!1ses!2shn" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        direccion: 'VW95+Q2W, CA-11, Santa Rita, Copán', 
        lider: '', 
        sublider: '', 
        lugar: 'Casa de Hna Maria Elisa' 
      }
    ]
  },
  {
    id: 'b2',
    nombre: 'Senderos de la Cascada',
    grupos: [
      { 
        nombre: 'Pequeños Discipulados', 
        iframe: '<iframe src="https://www.google.com/maps?q=Barrio+Nueva+Esperanza,+Lote+8,+Honduras&output=embed" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
        direccion: 'VW95+Q2W, CA-11, Santa Rita, Copán', 
        lider: '', 
        sublider: '', 
        lugar: '' 
      }
    ]
  },
  {
    id: 'b3',
    nombre: 'Las Brisas',
    grupos: [
      { 
        nombre: 'Discipulado #1', 
        iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d810.6703395462129!2d-89.09676404299611!3d14.868986055400736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f63dd000866393b%3A0x9ea964e226e7082c!2sDiscipulado%20%231!5e0!3m2!1ses!2shn!4v1762716402887!5m2!1ses!2shn" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        direccion: 'VW93+JF5, Santa Rita, Copán', 
        lider: '', 
        sublider: '', 
        lugar: '' 
      },
    ]
  },
  {
    id: 'b4',
    nombre: 'Barrio Nuevo',
    grupos: [
      { 
        nombre: 'Discipulado #2', 
        iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3856.2118693172165!2d-89.09502212493312!3d14.869426670438598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f63e7b5639be41d%3A0x95c16347dea2b081!2sDiscipulado%20%232%20iglesia%20Ebenezer%20Santa%20Rita%20copan!5e0!3m2!1ses!2shn!4v1762715971695!5m2!1ses!2shn" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        direccion: 'VW95+Q2W, CA-11, Santa Rita, Copán', 
        lider: 'Hno Cesar Lopez', 
        sublider: 'Hna Maritza Brizuela', 
        lugar: 'Casa de Hno. Cesar' 
      },
      { 
        nombre: 'Discipulado #4', 
        iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d964.0595049622557!2d-89.09325293043098!3d14.867963195307638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f63e7006b2a2409%3A0xa974e1a369a3c028!2sDiscipulado%20%235!5e0!3m2!1ses!2shn!4v1762716736521!5m2!1ses!2shn" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        direccion: 'VW95+Q2W, CA-11, Santa Rita, Copán', 
        lider: 'Hna Blanca Pinto', 
        sublider: '', 
        lugar: 'Casa de. ' 
      }
    ]
  },
  {
    id: 'b5',
    nombre: 'El Salamo',
    grupos: [
      { 
        nombre: 'Disipulado #', 
        iframe: '<iframe src="https://www.google.com/maps?q=Sector+Alta,+Calle+2,+Honduras&output=embed" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
        direccion: 'VW95+Q2W, CA-11, Santa Rita, Copán', 
        lider: '', 
        sublider: '', 
        lugar: '' 
      },
      { 
        nombre: 'Discipulado #', 
        iframe: '<iframe src="https://www.google.com/maps?q=Camino+Real+14,+Esperanza+Alta,+Honduras&output=embed" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
        direccion: 'VW95+Q2W, CA-11, Santa Rita, Copán', 
        lider: '', 
        sublider: '', 
        lugar: '' 
      }
    ]
  }
];

// Referencias DOM
const barriosList = document.getElementById('barriosList');
const detalleTitulo = document.getElementById('detalleTitulo');
const detalleSub = document.getElementById('detalleSub');
const gruposContainer = document.getElementById('gruposContainer');

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
  document.querySelectorAll('.btn-bar').forEach(b => b.classList.remove('active'));
  if (clickedBtn) clickedBtn.classList.add('active');

  const barrio = BARRIOS.find(x => x.id === id);
  if (!barrio) return;

  detalleTitulo.textContent = barrio.nombre;
  detalleSub.textContent = `${barrio.grupos.length} discipulado(s) disponible(s).`;

  gruposContainer.innerHTML = '';
  barrio.grupos.forEach(g => {
    const card = document.createElement('article');
    card.className = 'grupo-card';

    card.innerHTML = `
      <h3 class="grupo-title">${g.nombre}</h3>
      <p class="grupo-meta">${g.direccion}</p>
      <ul class="contact-list">
        <li><strong>Líder:</strong> ${g.lider}</li>
        <li><strong>Sub-líder:</strong> ${g.sublider}</li>
        <li><strong>Lugar:</strong> ${g.lugar}</li>
      </ul>
      <div class="mapa-wrapper">${g.iframe}</div>
      <button class="btn-mapa" type="button" onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(g.direccion)}','_blank')">Ver ruta en Google Maps</button>
    `;

    gruposContainer.appendChild(card);
  });
}

// Inicialización
renderBarrios();

// Seleccionar primer barrio automáticamente
if (BARRIOS.length > 0) {
  const firstBtn = document.querySelector('.btn-bar');
  if (firstBtn) firstBtn.click();
}
