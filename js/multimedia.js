const API_KEY = 'AIzaSyBn41Jf367kk---Opad_qq9jlMWuVbZAxE';
const CHANNEL_ID = 'UCsM-kI4yXjR7XXH5svyy0Kg';

document.addEventListener('DOMContentLoaded', () => {
    // Fetch Channel Banner
    fetch(`https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${CHANNEL_ID}&key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const channel = data.items[0];
            const bannerImageUrl = channel.brandingSettings.image.bannerExternalUrl;
            document.getElementById('channelHeader').style.backgroundImage = `url(${bannerImageUrl})`;
        });

    // Fetch Live Streams
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&eventType=live&type=video`)
        .then(response => response.json())
        .then(data => {
            const live = document.getElementById('live');
            if (data.items.length === 0) {
                const noLiveMessage = document.createElement('p');
                noLiveMessage.id = 'noLive';
                noLiveMessage.textContent = 'Actualmente no estamos transmitiendo en vivo.';
                live.appendChild(noLiveMessage);
            } else {
                data.items.forEach(item => {
                    createVideoElement(item, live);
                });
            }
        });

    // Fetch Past Streams (assuming they're marked with a specific playlist ID)
    fetch(`https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=YOUR_PAST_STREAMS_PLAYLIST_ID&part=snippet&maxResults=20`)
        .then(response => response.json())
        .then(data => {
            const pastStreams = document.getElementById('pastStreams');
            data.items.forEach(item => {
                createVideoElement(item, pastStreams);
            });
        });

    // Fetch Videos
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&type=video&maxResults=20`)
        .then(response => response.json())
        .then(data => {
            const videos = document.getElementById('videos');
            data.items.forEach(item => {
                createVideoElement(item, videos);
            });
        });

    // Fetch Podcasts (assuming they're marked with a specific playlist ID)
    fetch(`https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=YOUR_PODCASTS_PLAYLIST_ID&part=snippet&maxResults=20`)
        .then(response => response.json())
        .then(data => {
            const podcasts = document.getElementById('podcasts');
            data.items.forEach(item => {
                createVideoElement(item, podcasts);
            });
        });
});

function createVideoElement(item, container) {
    const videoId = item.id.videoId || item.snippet.resourceId.videoId;
    const videoTitle = item.snippet.title;
    const videoThumbnail = item.snippet.thumbnails.high.url;
    const videoElement = document.createElement('div');
    videoElement.className = 'video';
    videoElement.innerHTML = `
        <img src="${videoThumbnail}" alt="${videoTitle}">
        <h3>${videoTitle}</h3>
        <p>${videoId}</p>
  
    `;
    videoElement.addEventListener('click', () => {
        localStorage.setItem('videoId', videoId);
        localStorage.setItem('videoTitle', videoTitle);
        localStorage.setItem('videoDescription', item.snippet.description);
        window.location.href = 'reproductor.html';
    });
    container.appendChild(videoElement);
}











// buscadorrr




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