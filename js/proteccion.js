
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si la contraseña fue ingresada previamente
    const paginaDesbloqueada = localStorage.getItem('paginaDesbloqueada');

    if (paginaDesbloqueada !== '1') {
        // Redirigir automáticamente si no se desbloqueó la página
        window.location.href = '../escuela/';
    }
});

