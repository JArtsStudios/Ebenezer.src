document.addEventListener('DOMContentLoaded', () => {
  const videoId = localStorage.getItem('videoId');
  const videoTitle = localStorage.getItem('videoTitle');
  const videoDescription = localStorage.getItem('videoDescription');

  const API_KEY = 'AIzaSyBn41Jf367kk---Opad_qq9jlMWuVbZAxE';
  const CLIENT_ID = '35534197194-pm00tplli5c42na6uokjn3kbaobpie4b.apps.googleusercontent.com';

  // Necesario para dar like / comentar
  const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'];
  const SCOPES = 'https://www.googleapis.com/auth/youtube.force-ssl';

  let GoogleAuth = null;

  // ===== Title / Description =====
  const titleEl = document.getElementById('videoTitle');
  const descEl = document.getElementById('videoDescription');
  if (titleEl) titleEl.textContent = videoTitle || '';
  if (descEl) descEl.textContent = videoDescription || '';

  // ===== Toggle descripción =====
  const toggleDescriptionButton = document.getElementById('toggleDescription');
  const descBox = document.getElementById('descBox');

  if (descBox) descBox.style.display = 'none';

  if (toggleDescriptionButton) {
    toggleDescriptionButton.addEventListener('click', () => {
      if (!descBox) return;
      const hidden = descBox.style.display === 'none' || descBox.style.display === '';
      descBox.style.display = hidden ? 'block' : 'none';
      toggleDescriptionButton.innerHTML = hidden
        ? `<i class="fa-solid fa-eye-slash"></i> Ocultar descripción`
        : `<i class="fa-solid fa-align-left"></i> Ver descripción`;
    });
  }

  // ===== Likes + comments count =====
  function refreshStats() {
    if (!videoId) return;

    fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY}`)
      .then(r => r.json())
      .then(data => {
        const stats = data.items?.[0]?.statistics;
        if (!stats) return;

        const likes = stats.likeCount ?? '0';
        const commentCount = stats.commentCount ?? '0';

        const likesEl = document.getElementById('videoLikes');
        const commentsEl = document.getElementById('videoComments');

        if (likesEl) likesEl.textContent = `Likes: ${likes}`;
        if (commentsEl) commentsEl.textContent = `Comentarios: ${commentCount}`;
      })
      .catch(() => {});
  }
  refreshStats();

  // ===== Comentarios (lista) =====
  function loadComments() {
    if (!videoId) return;

    fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}&maxResults=10&order=time`)
      .then(r => r.json())
      .then(data => {
        const commentsContainer = document.getElementById('comments');
        if (!commentsContainer) return;

        commentsContainer.innerHTML = '';

        if (!data.items || data.items.length === 0) {
          commentsContainer.innerHTML = `<div class="comment"><p>No hay comentarios para mostrar.</p></div>`;
          return;
        }

        data.items.forEach(item => {
          const sn = item.snippet?.topLevelComment?.snippet;
          if (!sn) return;

          const comment = (sn.textDisplay || '').replace(/</g, "&lt;").replace(/>/g, "&gt;");
          const author = sn.authorDisplayName || 'Usuario';

          const commentElement = document.createElement('div');
          commentElement.className = 'comment';
          commentElement.innerHTML = `<p><strong>${author}</strong>: ${comment}</p>`;
          commentsContainer.appendChild(commentElement);
        });
      })
      .catch(() => {});
  }
  loadComments();

  // ==========================
  // OAuth (gapi) - Login/Logout
  // ==========================
  const authStatus = document.getElementById('authStatus');
  const loginBtn = document.getElementById('loginButton');
  const logoutBtn = document.getElementById('logoutButton');

  function setAuthUI(isSignedIn) {
    if (!authStatus || !loginBtn || !logoutBtn) return;

    if (isSignedIn) {
      authStatus.textContent = 'Conectado';
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'inline-flex';
    } else {
      authStatus.textContent = 'No conectado';
      loginBtn.style.display = 'inline-flex';
      logoutBtn.style.display = 'none';
    }
  }

  function initGapi() {
    if (!window.gapi) return;

    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      }).then(() => {
        GoogleAuth = window.gapi.auth2.getAuthInstance();

        setAuthUI(GoogleAuth.isSignedIn.get());

        GoogleAuth.isSignedIn.listen((val) => {
          setAuthUI(val);
        });

        if (loginBtn) {
          loginBtn.addEventListener('click', async () => {
            try {
              await GoogleAuth.signIn();
            } catch (e) {
              alert('No se pudo iniciar sesión.');
            }
          });
        }

        if (logoutBtn) {
          logoutBtn.addEventListener('click', async () => {
            try {
              await GoogleAuth.signOut();
            } catch (e) {}
          });
        }
      }).catch(() => {
        // típico si el origen no coincide con lo permitido en OAuth
        if (authStatus) authStatus.textContent = 'Error OAuth';
      });
    });
  }

  // gapi carga async, esperamos un poquito
  const gapiWait = setInterval(() => {
    if (window.gapi) {
      clearInterval(gapiWait);
      initGapi();
    }
  }, 50);

  // ==========================
  // Like (YouTube Data API v3)
  // ==========================
  const likeButton = document.getElementById('likeButton');
  if (likeButton) {
    likeButton.addEventListener('click', async () => {
      if (!GoogleAuth || !GoogleAuth.isSignedIn.get()) {
        alert('Debes iniciar sesión primero.');
        return;
      }
      if (!videoId) return;

      try {
        await window.gapi.client.youtube.videos.rate({
          id: videoId,
          rating: 'like'
        });

        // Refresca stats (puede tardar unos segundos en reflejar)
        refreshStats();
        alert('¡Like dado!');
      } catch (err) {
        const msg = err?.result?.error?.message || 'Error al dar like.';
        alert(msg);
      }
    });
  }

  // ==========================
  // Comentar (commentThreads.insert)
  // ==========================
  const submitComment = document.getElementById('submitComment');
  if (submitComment) {
    submitComment.addEventListener('click', async () => {
      if (!GoogleAuth || !GoogleAuth.isSignedIn.get()) {
        alert('Debes iniciar sesión primero.');
        return;
      }
      if (!videoId) return;

      const input = document.getElementById('commentInput');
      const text = (input?.value || '').trim();

      if (!text) {
        alert('Escribe un comentario.');
        return;
      }

      try {
        await window.gapi.client.youtube.commentThreads.insert({
          part: 'snippet',
          resource: {
            snippet: {
              videoId: videoId,
              topLevelComment: {
                snippet: { textOriginal: text }
              }
            }
          }
        });

        if (input) input.value = '';

        // Recarga comentarios y stats
        loadComments();
        refreshStats();

        alert('Comentario enviado.');
      } catch (err) {
        const msg = err?.result?.error?.message || 'Error al enviar comentario.';
        alert(msg);
      }
    });
  }

  // ==========================
  // Player (YouTube Iframe API) + overlay
  // ==========================
  const playerWrap = document.getElementById('player');
  if (!playerWrap || !videoId) return;

  playerWrap.style.position = 'relative';

  const endOverlay = document.createElement('div');
  endOverlay.id = 'endOverlay';
  endOverlay.style.cssText = `
    position:absolute;
    inset:0;
    display:none;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    gap:10px;
    background: rgba(0,0,0,0.72);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 18px;
    z-index: 50;
    text-align:center;
    padding: 18px;
  `;
  endOverlay.innerHTML = `
    <div style="font-family:Comfortaa, sans-serif; font-weight:800; font-size:16px; color:rgba(255,255,255,.92);">
      Video finalizado
    </div>
    <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center;">
      <button id="replayBtn" style="
        border:1px solid rgba(255,255,255,.18);
        background: rgba(255,255,255,.10);
        color:#fff;
        padding:10px 14px;
        border-radius:14px;
        cursor:pointer;
      ">
        <i class="fa-solid fa-rotate-right"></i> Reproducir de nuevo
      </button>
      <button id="backBtn" style="
        border:1px solid rgba(255,255,255,.12);
        background: rgba(255,255,255,.06);
        color:#fff;
        padding:10px 14px;
        border-radius:14px;
        cursor:pointer;
      ">
        <i class="fa-solid fa-arrow-left"></i> Volver
      </button>
    </div>
  `;
  playerWrap.appendChild(endOverlay);

  if (!window.YT || !window.YT.Player) {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  }

  let ytPlayer = null;

  window.onYouTubeIframeAPIReady = () => {
    playerWrap.innerHTML = '';
    playerWrap.appendChild(endOverlay);

    const p = document.createElement('div');
    p.id = 'ytPlayer';
    playerWrap.insertBefore(p, endOverlay);

    ytPlayer = new YT.Player('ytPlayer', {
      videoId,
      width: '100%',
      height: '100%',
      playerVars: {
        rel: 0,
        modestbranding: 1,
        iv_load_policy: 3,
        fs: 1,
        playsinline: 1,
        controls: 1
      },
      events: {
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.ENDED) endOverlay.style.display = 'flex';
          if (e.data === YT.PlayerState.PLAYING) endOverlay.style.display = 'none';
        }
      }
    });

    const replayBtn = document.getElementById('replayBtn');
    const backBtn = document.getElementById('backBtn');

    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        endOverlay.style.display = 'none';
        ytPlayer.seekTo(0, true);
        ytPlayer.playVideo();
      });
    }

    if (backBtn) {
      backBtn.addEventListener('click', () => window.history.back());
    }
  };
});
