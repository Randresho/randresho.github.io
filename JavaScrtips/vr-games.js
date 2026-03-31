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
    title: "Nueva Vida 3 experiece collection",
    id: "giI7peRFbCE",
    client: "Cooperativa Nueva Vida",
    description:
      "This immersive VR collection features three distinct mini-games fully powered by intuitive hand-tracking technology and integrated with a live online server to sync real-time data and aggregate total scores. The experience begins with an 'Object Rain' challenge, where players must use precise hand gestures to gather as many items as possible within a time limit. The second game puts a twist on the classic 'shell game'—after a series of chests are shuffled, the player must physically swim through the virtual environment to reach the correct one. Finally, the journey culminates in a high-speed space-themed roller coaster where the user grabs items while in motion. Upon completion, the system automatically transmits the cumulative score from all three games to the server, creating a seamless and competitive loop for the player.",
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
    title: "Nueva Vida Timeline interactive",
    id: "7D5IfY2euGA",
    client: "Cooperativa Nueva Vida",
    description:
      "This timeline experience VR prototype for Cooperativa Nueva Vida is a great look at how you're using Unity's storytelling tools to turn history into an interactive journey. By introducing a friendly, low-poly owl mascot as a guide, you've transformed what could have been a static list of dates into a dynamic experience where the user literally clicks through time. It’s a clever use of hand-tracking and spatial UI. The mix of character-driven dialogue and environmental shifts makes the organization's heritage feel much more tangible and engaging than a traditional presentation ever could.",
    thumb: getThumb("7D5IfY2euGA"),
  },
  {
    title: "Gyssa Quiz",
    id: "-zFJaNs5YEE",
    client: "Gyssa & Salesforce",
    description:
      "An immersive VR 'Plank Challenge' designed for Gyssa and Salesforce, blending high-altitude thrills with interactive corporate training. Developed in Unity, the experience uses verticality and spatial UI to gamify a Salesforce Service Cloud quiz, forcing players to master technical concepts while navigating a high-stakes urban simulation. It represents a sophisticated fusion of psychological engagement, precise ray-cast interaction, and educational gamification.",
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
    //<p>${video.client}</p>

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
