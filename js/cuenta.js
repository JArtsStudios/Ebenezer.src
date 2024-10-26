// Manejo del formulario de creación de cuenta

document.getElementById('accountForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener datos del formulario
    let username = document.getElementById('username').value;
    let avatar = document.getElementById('avatar').files[0];

    // Guardar datos localmente (simulación con localStorage)
    localStorage.setItem('username', username);

    // Convertir la imagen a base64 para guardarla en localStorage
    if (avatar) {
        const reader = new FileReader();
        reader.readAsDataURL(avatar);
        reader.onload = function () {
            localStorage.setItem('avatar', reader.result);
            // Redireccionar a perfil.html
            window.location.href = 'perfil.html';
        };
    } else {
        // Redireccionar a perfil.html sin guardar la imagen si no se seleccionó
        window.location.href = 'perfil.html';
    }
});



