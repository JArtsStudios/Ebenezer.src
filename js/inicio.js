// Mostrar la imagen de perfil almacenada localmente

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


document.addEventListener("DOMContentLoaded", function() {
    // Verifica si ya se ha aceptado las cookies
    if (!localStorage.getItem("cookiesAccepted")) {
      document.getElementById("cookie-banner").style.display = "block";
    }
  
    document.getElementById("accept-cookies").addEventListener("click", function() {
      // Almacena la aceptación en localStorage
      localStorage.setItem("cookiesAccepted", "true");
      document.getElementById("cookie-banner").style.display = "none"; // Oculta el banner
    });
  });
  


// Añadir un efecto parallax con retraso al scroll
window.addEventListener('scroll', function() {
    let offset = window.pageYOffset;
    document.getElementById('layer1').style.transform = 'translateY(' + offset * 0.2 + 'px)';
    document.getElementById('layer2').style.transform = 'translateY(' + offset * 0.4 + 'px)';
    document.getElementById('layer3').style.transform = 'translateY(' + offset * 0.6 + 'px)';
    document.getElementById('layer4').style.transform = 'translateY(' + offset * 0.8 + 'px)';
    document.getElementById('layer3').style.opacity = 1 - offset / 6000; // Esconde el h1 gradualmente
});

// Restablecer la opacidad del h1 al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('layer3').style.opacity = 1;
});



document.getElementById("menu-icon").onclick = function () {
    var navLinks = document.getElementById("nav-links");
    navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
}


// esto es para el scroll



let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}
//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}
// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 8000)
function showSlider(){
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 8000)
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})





document.addEventListener('DOMContentLoaded', function() {
    const redirectLink = document.getElementById('redirectLink');
    redirectLink.addEventListener('click', function(event) {
        const claveCorrecta = localStorage.getItem('claveCorrecta');
        if (claveCorrecta !== '1') {
            event.preventDefault();
            window.location.href = 'clave.html';
        } else {
            window.location.href = 'escuela.html';
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const redirectLink2 = document.getElementById('redirectLink2');
    redirectLink2.addEventListener('click', function(event) {
        const claveCorrecta = localStorage.getItem('claveCorrecta');
        if (claveCorrecta !== '1') {
            event.preventDefault();
            window.location.href = 'clave.html';
        } else {
            window.location.href = 'escuela.html';
        }
    });
});



// buscadorrr




const pages = [
    { url: '../multimedia.html', name: 'Multimedia' },
    { url: '../oraciones.html', name: 'Oraciones' },
    { url: '../ministerio/', name: 'Ministerios' },
    { url: '../escuela/', name: 'Escuela' },
    { url: '../escuela/progreso/', name: 'Progresos'}
    // Añade más páginas aquí
];

const sections = [
    { url: '#horarios', name: 'Horarios en Inicio' },
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
