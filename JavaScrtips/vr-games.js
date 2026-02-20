const videos = [
  {
    title: "Birds",
    id: "cgTvly9-z4k",
    description: "Un vistazo increíble a las cordilleras en invierno.",
    thumb: getThumb("cgTvly9-z4k"),
  },
  {
    title: "Nueva Vida",
    id: "giI7peRFbCE",
    description: "Un vistazo increíble a las cordilleras en invierno.",
    thumb: getThumb("giI7peRFbCE"),
  },
  {
    title: "Nueva Vida",
    id: "60DN1SSKt4k",
    description: "Un vistazo increíble a las cordilleras en invierno.",
    thumb: getThumb("60DN1SSKt4k"),
  },
];

let currentIndex = 0;
let player;

var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const videoElem = document.getElementById("main-video");
const titleElem = document.getElementById("video-title");
const descElem = document.getElementById("video-description");
const playlistElem = document.getElementById("playlist-items");

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "450",
    width: "100%",
    videoId: videos[currentIndex].id,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerReady(event) {
  renderPlaylist();
  updateText();
}

function onPlayerStateChange(event) {
  // YT.PlayerState.ENDED es igual a 0
  if (event.data == YT.PlayerState.ENDED) {
    nextVideo();
  }
}

function nextVideo() {
  currentIndex++;
  if (currentIndex >= videos.length) currentIndex = 0;
  loadVideo(currentIndex);
}

// 2. Función para cargar un video
function loadVideo(index) {
  currentIndex = index;
  const v = videos[index];

  // Usamos el método de la API para cargar el nuevo video
  player.loadVideoById(v.id);

  updateText();
  renderPlaylist();
}

function updateText() {
  const v = videos[currentIndex];
  document.getElementById("video-title").innerText = v.title;
  document.getElementById("video-description").innerText = v.description;
}

// 3. Crear la lista visual a la derecha
function renderPlaylist() {
  const playlistElem = document.getElementById("playlist-items");
  playlistElem.innerHTML = "";
  videos.forEach((video, index) => {
    const item = document.createElement("div");
    item.classList.add("playlist-item");
    if (index === currentIndex) item.classList.add("active");

    item.innerHTML = `
            <img src="${video.thumb}">
            <h4>${video.title}</h4>
        `;

    item.onclick = () => loadVideo(index);
    playlistElem.appendChild(item);
  });
}

// 4. Evento: Cuando termine el video, pasar al siguiente
videoElem.addEventListener("ended", () => {
  let nextIndex = currentIndex + 1;
  if (nextIndex >= videos.length) nextIndex = 0; // Reiniciar al primer video
  loadVideo(nextIndex);
});

// Inicializar
loadVideo(0);

function getDirectLink(url) {
  return `https://www.youtube.com/embed/${url}?autoplay=1&rel=0`; // Si no es de Drive, lo deja igual
}

function getThumb(url) {
  return `https://img.youtube.com/vi/${url}/mqdefault.jpg`; // Si no es de Drive, lo deja igual
}
