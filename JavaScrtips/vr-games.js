const videos = [
  {
    title: "Proyecto Aldea Global - Panacam",
    id: "cgTvly9-z4k",
    client: "Panacam",
    description:
      "Leveraging advanced hand-tracking integration, this Unity-powered experience allows users to navigate an interactive spatial UI to discover and summon indigenous wildlife. By combining high-fidelity 3D modeling with immersive spatial acoustics and physics-based gesture inputs, the project delivers a compelling educational narrative focused on biodiversity and environmental conservation.",
    thumb: getThumb("cgTvly9-z4k"),
  },
  {
    title: "Nueva Vida",
    id: "giI7peRFbCE",
    client: "Cooperativa Nueva Vida",
    description: "Un vistazo increíble a las cordilleras en invierno.",
    thumb: getThumb("giI7peRFbCE"),
  },
  {
    title: "Nueva Vida 360° ",
    id: "60DN1SSKt4k",
    client: "Cooperativa Nueva Vida",
    description:
      "Transforming facility tours into a scalable digital experience, this application blends immersive 360° photography with interactive 3D elements. Users navigate through various departments via an intuitive spatial interface, experiencing smooth, high-definition transitions that mimic a physical walkthrough. This telepresence tool streamlines the onboarding process for new members, providing a comprehensive and engaging overview of the cooperative’s infrastructure and services.",
    thumb: getThumb("60DN1SSKt4k"),
  },
  {
    title: "Gyssa Quiz",
    id: "-zFJaNs5YEE",
    client: "Gyssa",
    description: "Un vistazo increíble a las cordilleras en invierno.",
    thumb: getThumb("-zFJaNs5YEE"),
  },
  {
    title: "Goalkeeper VR",
    id: "TrNXwqgMYxE",
    client: "VR Studio",
    description:
      "This experiece is a VR sports simulation where the player takes on the role of a soccer goalkeeper in a crowded stadium. Using physics-based hand tracking, the user must react to incoming penalty shots from an AI striker to defend the goal. The experience features a localized spatial UI with regional flags and dynamic visual feedback, such as screen tints to indicate successful goals or saves. The project demonstrates real-time collision detection and immersive environmental storytelling through animated crowds and digital stadium signage.",
    thumb: getThumb("TrNXwqgMYxE"),
  },

  /*{
    title: "Video Title",
    id: "Video ID",
    client: "Client",
    description: "Description",
    thumb: getThumb("Video ID"),
  },*/
];

let currentIndex = 0;
let player;

var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const videoElem = document.getElementById("main-video");
const titleElem = document.getElementById("video-title");
const clientElem = document.getElementById("client");
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
  document.getElementById("client").innerText = v.client;
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
