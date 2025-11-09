// Mostrar nombre de usuario desde localStorage
document.addEventListener('DOMContentLoaded', function() {
    let username = localStorage.getItem('nombre') || 'Usuario';
    document.getElementById('username').textContent = `¡Hola, ${username}!`;

    // Mostrar progreso
    const progresoContainer = document.querySelector('.progreso');
    const progreso = parseInt(localStorage.getItem('progreso')) || 1;

    for (let i = 1; i <= progreso; i++) {
        const leccion = document.createElement('div');
        leccion.classList.add('leccion');
        leccion.innerText = `Lección ${i} completada`;
        progresoContainer.appendChild(leccion);
    }

    // Mostrar certificado si completó todas las lecciones
    if (progreso >= 24) {
        const imagenContainer = document.createElement('div');
        imagenContainer.classList.add('imagen-descargable');
        imagenContainer.innerHTML = `<a href="../../img/certificado.png" download="certificado.png">Descargar Certificado</a>`;
        progresoContainer.appendChild(imagenContainer);
    }
});
