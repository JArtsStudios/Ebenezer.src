
// buscadorrr





const pages = [
    { url: '../multimedia.html', name: 'Multimedia' },
    { url: '../oraciones.html', name: 'Oraciones' },
    { url: '../inicio/', name: 'Inicio' },
    { url: '../escuela.html', name: 'Escuela' },
    // Añade más páginas aquí
];

const sections = [
    { url: '../inicio/#horarios', name: 'Horarios en Inicio' },
    { url: '#discipulados', name: 'Discipulados Inicio' },
    { url: '../ministerio/#Departamentos', name: 'Departamentos en el Ministerio' },
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











// Añadir un efecto parallax con retraso al scroll
window.addEventListener('scroll', function() {
    let offset = window.pageYOffset;
    document.getElementById('layer1').style.transform = 'translateY(' + offset * 0.2 + 'px)';
    document.getElementById('layer2').style.transform = 'translateY(' + offset * 0.4 + 'px)';
    document.getElementById('layer3').style.transform = 'translateY(' + offset * 0.6 + 'px)';
    document.getElementById('layer4').style.transform = 'translateY(' + offset * 0.8 + 'px)';
    document.getElementById('layer3').style.opacity = 1 - offset / 2000; // Esconde el h1 gradualmente
});

// Restablecer la opacidad del h1 al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('layer3').style.opacity = 1;
});



function openNav() {
    document.getElementById("menu").style.width = "250px";
}

function closeNav() {
    document.getElementById("menu").style.width = "0";
}




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


const message = String.fromCharCode(116, 101, 32, 97, 109, 111);
console.log(message);
