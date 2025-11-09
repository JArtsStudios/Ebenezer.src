
const pages = [
    { url: '../multimedia/', name: 'Multimedia' },
    { url: '../inicio/', name: 'Inicio' },
    { url: '../oraciones/', name: 'Oraciones' },
    { url: '../ministerio/', name: 'Ministerios' },
    { url: '../eventos/', name: 'Eventos' },
    { url: '../social/', name: 'Redes Sociales' },
    { url: '../escuela/', name: 'Escuela' },
    { url: '../escuela/progreso/', name: 'Progresos'}
 
];

const sections = [
    { url: '../inicio/#horarios', name: 'Horarios en Inicio' },
    { url: '../inicio/#discipulados', name: 'Discipulados Inicio' },
    { url: '../ministerio/#Departamentos', name: 'Departamentos en el Ministerio' },
    { url: '../multimedia/#videos', name: 'Videos' },

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


