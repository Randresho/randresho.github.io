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
  {
    title: "Roller Coaster - Coorporativa Chorrotega",
    id: "_r47Ywo7UqM",
    client: "Coorporativa Chorrotega",
    description:
      "This immersive VR Roller Coaster base on a high-speed space-themed roller coaster where the user grabs items while in motion.",
    thumb: getThumb("_r47Ywo7UqM"),
  },
  {
    title: "Fruit Ninja",
    id: "z2t0oQDkvHA",
    client: "Kerns",
    description:
      "A vibrant, branded virtual reality game inspired by the 'Fruit Ninja' mechanics, featuring products from the brand Kern's. Players use dual katanas to slice through various fruits, that are tossed into the air against a colorful, floating island backdrop. Large 3D models of Kern's beverage cans, serve as prominent environmental elements, reinforcing the promotional theme. The interface includes a countdown timer, a point tracker, and a health system represented by three hearts at the top of the screen. As players successfully chain slices together, 'Combo' text and visual effects pop up to reward their accuracy and speed.",
    thumb: getThumb("z2t0oQDkvHA"),
  },
  {
    title: "Escape Room",
    id: "vBZDbwWdZgs",
    client: "Unitec",
    description:
      "This is a multiplayer VR escape room experience built in Unity, where players must collaborate to solve a series of complex puzzles to win their freedom. The project leverages Hand-Tracking technology for natural, controller-free interactions and integrates Photon (PUN2/Fusion) to handle the real-time networking and synchronized multiplayer state. By combining intuitive gesture-based mechanics with a shared virtual environment, players can physically manipulate objects and communicate in real-time, creating a highly immersive and social problem-solving experience.",
    thumb: getThumb("vBZDbwWdZgs"),
  },
  {
    title: "Whack a Moles",
    id: "8mq2fYq7xu0",
    client: "VR Studio",
    description:
      "Hit the Moles and win prizes in a retro arcade simulation, Using Meta Quest and Unity for developing ",
    thumb: getThumb("8mq2fYq7xu0"),
  },
  /*{
    title: "Video Title",
    id: "VideoID",
    client: "Client",
    description: "Description",
    thumb: getThumb("VideoID"),
  },*/
];

// ── State ─────────────────────────────────────────────
let currentIndex = 0;
let player;
let hoverTimers = {}; // track per-item hover debounce

// ── Load YouTube IFrame API ───────────────────────────
(function () {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);
})();

// ── Called by YouTube API when ready ─────────────────
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: videos[currentIndex].id,
    playerVars: { rel: 0, modestbranding: 1 },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerReady() {
  renderPlaylist();
  updateInfo();
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    nextVideo();
  }
}

// ── Video navigation ──────────────────────────────────
function nextVideo() {
  currentIndex = (currentIndex + 1) % videos.length;
  loadVideo(currentIndex);
}

function loadVideo(index) {
  currentIndex = index;
  player.loadVideoById(videos[index].id);
  updateInfo();
  renderPlaylist();
  // Scroll player into view on mobile
  document
    .querySelector(".video-wrapper")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}

function updateInfo() {
  const v = videos[currentIndex];
  document.getElementById("video-title").textContent = v.title;
  document.getElementById("client").textContent = v.client;
  document.getElementById("video-description").textContent = v.description;
}

// ── Playlist rendering ────────────────────────────────
function renderPlaylist() {
  const container = document.getElementById("playlist-items");
  container.innerHTML = "";

  // Update heading with total count
  document.getElementById("videos-heading").textContent =
    `Videos (${videos.length})`;

  videos.forEach((video, index) => {
    const item = document.createElement("div");
    item.classList.add("playlist-item");
    if (index === currentIndex) item.classList.add("active");

    // Build preview embed URL (muted, autoplay on JS trigger)
    const previewSrc =
      `https://www.youtube.com/embed/${video.id}` +
      `?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.id}` +
      `&modestbranding=1&rel=0&disablekb=1`;

    item.innerHTML = `
      <div class="item-text">
        <img src="${video.thumb}" alt="${video.title}" loading="lazy" />
        <h4>${video.title}</h4>
        <p class="item-client">${video.client}</p>
      </div>
    `;

    // ── Hover preview logic ──────────────────────────
    const iframe = item.querySelector("iframe");

    item.addEventListener("mouseenter", () => {
      // Debounce: only load after 300ms hover to avoid flicker on fast passes
      hoverTimers[index] = setTimeout(() => {
        if (!iframe.src) {
          iframe.src = iframe.dataset.src; // lazy-load the iframe
        }
      }, 300);
    });

    item.addEventListener("mouseleave", () => {
      clearTimeout(hoverTimers[index]);
      // Reset iframe to stop playback without destroying the element
      if (iframe.src) {
        iframe.src = "";
      }
    });

    // ── Click loads in main player ───────────────────
    item.addEventListener("click", () => loadVideo(index));

    container.appendChild(item);
  });
}

function getDirectLink(url) {
  return `https://www.youtube.com/embed/${url}?autoplay=1&rel=0`; // Si no es de Drive, lo deja igual
}

function getThumb(url) {
  return `https://img.youtube.com/vi/${url}/mqdefault.jpg`; // Si no es de Drive, lo deja igual
}
