const API_KEY = 'AIzaSyBc5C7FbijNHzRb7kBy3CX6b92uuA_k2nk';
const CHANNEL_ID = 'UCsM-kI4yXjR7XXH5svyy0Kg';

document.addEventListener('DOMContentLoaded', () => {
  // Helper: fetch que muestra el error real
  async function fetchJson(url) {
    const res = await fetch(url);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const msg = data?.error?.message || `HTTP ${res.status}`;
      throw new Error(msg);
    }
    return data;
  }

  function showError(containerId, text) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const p = document.createElement('p');
    p.style.cssText = 'color:rgba(255,255,255,.75); padding:12px; border:1px solid rgba(255,255,255,.12); border-radius:14px; background:rgba(255,255,255,.04);';
    p.textContent = text;
    el.appendChild(p);
  }

  /* =========================
     BANNER DEL CANAL (HD)
     ========================= */
  (async () => {
    try {
      const data = await fetchJson(
        `https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${CHANNEL_ID}&key=${API_KEY}`
      );

      const channel = data.items?.[0];
      let bannerImageUrl = channel?.brandingSettings?.image?.bannerExternalUrl;

      const headerEl = document.getElementById('channelHeader');
      if (!headerEl || !bannerImageUrl) return;

      if (bannerImageUrl.includes('=w')) {
        bannerImageUrl = bannerImageUrl.replace(/=w\d+/g, '=w2560');
      } else {
        bannerImageUrl += '=w2560';
      }

      headerEl.style.backgroundImage = `url(${bannerImageUrl})`;
      headerEl.style.backgroundSize = 'cover';
      headerEl.style.backgroundPosition = 'center';
      headerEl.style.backgroundRepeat = 'no-repeat';
    } catch (e) {
      console.error('Banner error:', e.message);
    }
  })();

  /* =========================
     EN VIVO
     ========================= */
  (async () => {
    try {
      const data = await fetchJson(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&eventType=live&type=video`
      );

      const live = document.getElementById('live');
      if (!live) return;

      if (!data.items || data.items.length === 0) {
        const p = document.createElement('p');
        p.id = 'noLive';
        p.textContent = 'Actualmente no estamos transmitiendo en vivo.';
        live.appendChild(p);
      } else {
        data.items.forEach(item => createVideoElement(item, live));
      }
    } catch (e) {
      console.error('Live error:', e.message);
      showError('live', 'No se pudo cargar En Vivo. Revisa tu API Key (posible restricción por dominio).');
    }
  })();

  /* =========================
     VIDEOS + TRANSMISIONES PASADAS
     ========================= */
  (async () => {
    try {
      const data = await fetchJson(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&type=video&maxResults=40`
      );

      const videos = document.getElementById('videos');
      const pastStreams = document.getElementById('pastStreams');
      if (!data.items) return;

      let addedVideos = 0;
      let addedStreams = 0;

      data.items.forEach(item => {
        const title = item.snippet?.title || '';
        const t = title.toLowerCase();

        const isService =
          t.startsWith('servicio') ||
          t.startsWith('santa');

        if (isService && pastStreams) {
          createVideoElement(item, pastStreams);
          addedStreams++;
        }

        if (!isService && videos) {
          createVideoElement(item, videos);
          addedVideos++;
        }
      });

      // Si no agregó nada, deja pista visual
      if (videos && addedVideos === 0) {
        showError('videos', 'No se encontraron videos (o la API no devolvió resultados).');
      }
      if (pastStreams && addedStreams === 0) {
        showError('pastStreams', 'No se encontraron transmisiones pasadas (revisa los títulos: “servicio”, “santa”).');
      }

    } catch (e) {
      console.error('Videos/Streams error:', e.message);
      showError('videos', 'No se pudo cargar Videos. Probable 403 por restricción de la API Key.');
      showError('pastStreams', 'No se pudo cargar Transmisiones. Probable 403 por restricción de la API Key.');
    }
  })();

  /* =========================
     PODCASTS
     ========================= */
  (async () => {
    try {
      const data = await fetchJson(
        `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=YOUR_PODCASTS_PLAYLIST_ID&part=snippet&maxResults=20`
      );

      const podcasts = document.getElementById('podcasts');
      if (!podcasts || !data.items) return;

      data.items.forEach(item => createVideoElement(item, podcasts));
    } catch (e) {
      console.error('Podcasts error:', e.message);
      // opcional: showError('podcasts', 'No se pudo cargar Podcasts.');
    }
  })();
});

/* =========================
   CREAR TARJETA
   ========================= */
function createVideoElement(item, container) {
  const videoId = item.id?.videoId || item.snippet?.resourceId?.videoId;
  const videoTitle = item.snippet?.title || "Video";
  const videoThumbnail =
    item.snippet?.thumbnails?.high?.url ||
    item.snippet?.thumbnails?.medium?.url ||
    item.snippet?.thumbnails?.default?.url;

  if (!videoId || !videoThumbnail) return;

  const div = document.createElement('div');
  div.className = 'video';
  div.innerHTML = `
    <img src="${videoThumbnail}" alt="${videoTitle}">
    <h3>${videoTitle}</h3>
    <p>${videoId}</p>
  `;

  div.addEventListener('click', () => {
    localStorage.setItem('videoId', videoId);
    localStorage.setItem('videoTitle', videoTitle);
    localStorage.setItem('videoDescription', item.snippet?.description || "");
    window.location.href = '../multimedia/reproductor/';
  });

  container.appendChild(div);
}
