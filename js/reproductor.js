document.addEventListener('DOMContentLoaded', () => {
    const videoId = localStorage.getItem('videoId');
    const videoTitle = localStorage.getItem('videoTitle');
    const videoDescription = localStorage.getItem('videoDescription');
    const API_KEY = 'AIzaSyBn41Jf367kk---Opad_qq9jlMWuVbZAxE';

    // ... (El resto de tu código existente)


    document.getElementById('videoTitle').textContent = videoTitle;
    document.getElementById('videoDescription').textContent = videoDescription;

    const player = document.createElement('iframe');
    player.width = '800';
    player.height = '450';
    player.src = `https://www.youtube.com/embed/${videoId}`;
    player.frameBorder = '0';
    player.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    player.allowFullscreen = true;

    document.getElementById('player').appendChild(player);

       



         // Inicializa la API de Google
    gapi.load('client:auth2', () => {
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
        }).then(() => {
            GoogleAuth = gapi.auth2.getAuthInstance();
            updateSigninStatus(GoogleAuth.isSignedIn.get());
        });
    });

        // Función para manejar el estado de inicio de sesión
        function updateSigninStatus(isSignedIn) {
            if (isSignedIn) {
                document.getElementById('authStatus').textContent = 'Conectado';
                document.getElementById('loginButton').style.display = 'none';
            } else {
                document.getElementById('authStatus').textContent = 'No conectado';
                document.getElementById('loginButton').style.display = 'block';
            }
        }
    
        // Función para iniciar sesión
        document.getElementById('loginButton').addEventListener('click', () => {
            GoogleAuth.signIn();
        });



    // Obtener likes y comentarios
    fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                const videoStats = data.items[0].statistics;
                const likes = videoStats.likeCount;
                const commentCount = videoStats.commentCount;

                // Mostrar los likes y cantidad de comentarios
                document.getElementById('videoLikes').textContent = `Likes: ${likes}`;
                document.getElementById('videoComments').textContent = `Comentarios: ${commentCount}`;
            }
        })
        .catch(error => console.error('Error fetching video stats:', error));

    // Obtener los comentarios del video
    fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}&maxResults=5`)
        .then(response => response.json())
        .then(data => {
            const commentsContainer = document.getElementById('comments');
            if (data.items) {
                data.items.forEach(item => {
                    const comment = item.snippet.topLevelComment.snippet.textDisplay;
                    const author = item.snippet.topLevelComment.snippet.authorDisplayName;

                    // Crear un elemento para el comentario
                    const commentElement = document.createElement('div');
                    commentElement.className = 'comment';
                    commentElement.innerHTML = `
                        <p><strong>${author}</strong>: ${comment.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
                    `;
                    commentsContainer.appendChild(commentElement);
                });
            }
        })
        .catch(error => console.error('Error fetching comments:', error));
 // Botón para dar like
 document.getElementById('likeButton').addEventListener('click', () => {
    if (GoogleAuth.isSignedIn.get()) {
        const request = gapi.client.youtube.videos.rate({
            id: videoId,
            rating: 'like'
        });
        request.execute(response => {
            if (response.error) {
                alert('Error al dar like: ' + response.error.message);
            } else {
                alert('¡Like dado!');
            }
        });
    } else {
        alert('Debes iniciar sesión primero.');
    }
});

// Botón de enviar comentario
document.getElementById('submitComment').addEventListener('click', () => {
    const commentInput = document.getElementById('commentInput');
    const commentText = commentInput.value;

    if (commentText) {
        if (GoogleAuth.isSignedIn.get()) {
            const request = gapi.client.youtube.commentThreads.insert({
                part: 'snippet',
                resource: {
                    snippet: {
                        videoId: videoId,
                        topLevelComment: {
                            snippet: {
                                textOriginal: commentText
                            }
                        }
                    }
                }
            });
            request.execute(response => {
                if (response.error) {
                    alert('Error al enviar el comentario: ' + response.error.message);
                } else {
                    alert('Comentario enviado');
                    commentInput.value = ''; // Limpiar el campo de texto
                }
            });
        } else {
            alert('Debes iniciar sesión primero.');
        }
    } else {
        alert('Por favor, escribe un comentario.');
    }
});
});

    // Funcionalidad para alternar la descripción del video
    const toggleDescriptionButton = document.getElementById('toggleDescription');
    toggleDescriptionButton.addEventListener('click', () => {
        const videoDescriptionElement = document.getElementById('videoDescription');
        if (videoDescriptionElement.style.display === 'none' || videoDescriptionElement.style.display === '') {
            videoDescriptionElement.style.display = 'block';
            toggleDescriptionButton.textContent = 'Ocultar descripción';
        } else {
            videoDescriptionElement.style.display = 'none';
            toggleDescriptionButton.textContent = 'Ver descripción';
        }
    });








  



