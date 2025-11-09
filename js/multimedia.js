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
        window.location.href = '../multimedia/reproductor/';
    });
    container.appendChild(videoElement);
}











// buscadorrr


