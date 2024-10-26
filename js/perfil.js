// Mostrar datos del perfil almacenados localmente

document.addEventListener('DOMContentLoaded', function() {
    let username = localStorage.getItem('username');
    let avatar = localStorage.getItem('avatar');

    if (username) {
        document.getElementById('username').textContent = username;
    } else {
        console.log('No se encontró el nombre de usuario.');
    }

    const avatarElement = document.getElementById('avatar');
    const avatarEditIcon = document.querySelector('#avatar-edit i');

    if (avatar) {
        avatarElement.setAttribute('src', avatar);
        avatarElement.addEventListener('click', function() {
            // Simular el clic en el input de tipo file para seleccionar una nueva imagen
            document.getElementById('avatar-input').click();
        });

        // Mostrar el icono de lápiz al pasar el ratón sobre la imagen de perfil
        avatarElement.addEventListener('mouseenter', function() {
            avatarEditIcon.style.display = 'block';
        });

        // Ocultar el icono de lápiz al dejar de pasar el ratón sobre la imagen de perfil
        avatarElement.addEventListener('mouseleave', function() {
            avatarEditIcon.style.display = 'none';
        });
    } else {
        console.log('No se encontró la foto de perfil.');
    }

    // Manejar el cambio de la imagen de perfil
    document.getElementById('avatar-input').addEventListener('change', function(event) {
        const newAvatar = event.target.files[0];
        if (newAvatar) {
            const reader = new FileReader();
            reader.readAsDataURL(newAvatar);
            reader.onload = function () {
                localStorage.setItem('avatar', reader.result);
                avatarElement.setAttribute('src', reader.result);
            };
        }
    });
});



        // JavaScript para mostrar progreso
        document.addEventListener('DOMContentLoaded', (event) => {
            const progresoContainer = document.querySelector('.progreso');
            const progreso = localStorage.getItem('progreso') || 1;
            
            for (let i = 1; i <= progreso; i++) {
                const leccion = document.createElement('div');
                leccion.classList.add('leccion');
                leccion.innerText = `Lección ${i} completada`;
                progresoContainer.appendChild(leccion);
            }

            if (progreso >= 24) {
                const imagenContainer = document.createElement('div');
                imagenContainer.classList.add('imagen-descargable');
                imagenContainer.innerHTML = `<a href="img/img 3.jpeg" download="certificado.png">Descargar Certificado</a>`;
                progresoContainer.appendChild(imagenContainer);
            }
        });