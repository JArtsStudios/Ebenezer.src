
document.addEventListener('DOMContentLoaded', function() {
    const avatar = localStorage.getItem('avatar');
    const avatarElement = document.getElementById('avatar');

    if (avatar) {
        avatarElement.setAttribute('src', avatar);
    } else {
        console.log('No se encontró la foto de perfil.');
    }

    // Redireccionar a perfil.html al hacer clic en la imagen de perfil
    avatarElement.addEventListener('click', function() {
        window.location.href = 'perfil.html';
    });
});






// ----card code -----



const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    const content = card.querySelector('.content');

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * -10;

        content.style.setProperty('--rotateX', `${rotateX}deg`);
        content.style.setProperty('--rotateY', `${rotateY}deg`);
    });

    card.addEventListener('mouseleave', () => {
        content.style.setProperty('--rotateX', `0deg`);
        content.style.setProperty('--rotateY', `0deg`);
    });
});





//baner


document.getElementById('acceso').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar comportamiento por defecto del enlace

    const paginaDesbloqueada = localStorage.getItem('paginaDesbloqueada');
    if (paginaDesbloqueada === '1') {
        window.location.href = 'dotrinabasica.html';
    } else {
        document.getElementById('banner').classList.add('visible');
        document.getElementById('banner').classList.remove('hidden');
        document.getElementById('overlay').classList.add('visible');
        document.getElementById('overlay').classList.remove('hidden');
    }
});

document.getElementById('submit').addEventListener('click', function() {
    const password = document.getElementById('password').value;
    const mensaje = document.getElementById('mensaje');

    if (password === 'escuela@ebenezer') {
        localStorage.setItem('paginaDesbloqueada', '1');
        window.location.href = 'dotrinabasica.html';
    } else {
        mensaje.textContent = 'Contraseña incorrecta';
        mensaje.classList.remove('hidden');
    }
});

document.getElementById('close-banner').addEventListener('click', function() {
    document.getElementById('banner').classList.remove('visible');
    document.getElementById('banner').classList.add('hidden');
    document.getElementById('overlay').classList.remove('visible');
    document.getElementById('overlay').classList.add('hidden');
});



















const pages = [
    { url: 'multimedia.html', name: 'Multimedia' },
    { url: 'oraciones.html', name: 'Oraciones' },
    { url: 'ministerios.html', name: 'Ministerios' },
    { url: 'escuela.html', name: 'Escuela' },
    // Añade más páginas aquí
];

const sections = [
    { url: 'multimedia.html#horarios', name: 'Horarios en Multimedia' },
    { url: 'oraciones.html#discipulados', name: 'Discipulados en Oraciones' },
    { url: 'ministerios.html#progreso', name: 'Progreso en Ministerios' },
    // Añade más secciones aquí
];

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const content = document.querySelector('.content');
const blurOverlay = document.createElement('div');
blurOverlay.className = 'blur-overlay';
document.body.appendChild(blurOverlay);

let closeTimeout;

searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase();
    searchResults.innerHTML = '';

    if (query) {
        let results = [...pages, ...sections].filter(item =>
            item.name.toLowerCase().includes(query)
        );

        // Si no hay resultados
        if (results.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'No se encontraron resultados';
            searchResults.appendChild(noResults);
        }

        results.forEach(result => {
            const link = document.createElement('a');
            link.href = result.url;
            link.textContent = result.name;
            searchResults.appendChild(link);
        });

        searchResults.classList.add('show');
        content.classList.add('blur-background');
        blurOverlay.style.display = 'block';

        // Evitar que el cuadro se cierre de inmediato cuando se muestran resultados
        clearTimeout(closeTimeout);
    } else {
        closeSearchResults();
    }
});

// Cerrar resultados con un retraso
document.addEventListener('click', function (event) {
    if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
        closeTimeout = setTimeout(() => {
            closeSearchResults();
        }, 2000); // Cambia el tiempo de cierre a 2 segundos
    }
});

function closeSearchResults() {
    searchResults.classList.remove('show');
    content.classList.remove('blur-background');
    blurOverlay.style.display = 'none';
}

