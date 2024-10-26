function showContainer(containerId) {
    // Ocultar todos los contenedores
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        container.style.display = 'none';
    });

    // Mostrar el contenedor seleccionado
    const selectedContainer = document.getElementById(containerId);
    selectedContainer.style.display = 'flex';
}


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
