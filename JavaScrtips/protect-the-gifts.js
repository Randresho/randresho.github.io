let slideIdx = 0;
let autoPlay;

CreateDots();
ShowSlides();

function ShowSlides() {
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");

  console.log("number of photos found:", slides.length);
  console.log("Cur idx:", slideIdx);

  if (slides.length === 0) {
    console.error("There's no phtos on the slider");
    return;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (let j = 0; j < dots.length; j++) {
    dots[j].classList.remove("active");
  }

  slideIdx++;

  if (slideIdx > slides.length) {
    slideIdx = 1;
  }

  slides[slideIdx - 1].style.display = "block";

  if (dots[slideIdx - 1]) {
    dots[slideIdx - 1].classList.add("active");
  }

  // Cambia la imagen cada 5 segundos
  autoPlay = setTimeout(ShowSlides, 5000);
}

function plusSlides(n) {
  clearTimeout(autoPlay);

  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");

  slideIdx += n;

  if (slideIdx > slides.length) {
    slideIdx = 1;
  }

  if (slideIdx < 1) {
    slideIdx = slides.length;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (let j = 0; j < dots.length; j++) {
    dots[j].classList.remove("active");
  }

  if (dots[slideIdx - 1]) {
    dots[slideIdx - 1].classList.add("active");
  }

  slides[slideIdx - 1].style.display = "block";

  autoPlay = setTimeout(ShowSlides, 5000);
}

function CreateDots() {
  const slides = document.getElementsByClassName("slide");
  const dotContainer = document.getElementById("dot-container");

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");

    dot.onclick = () => GoToSlide(i + 1);
    dotContainer.appendChild(dot);
  }
}

function GoToSlide(n) {
  clearTimeout(autoPlay);

  slideIdx = n - 1;

  ShowSlides();
}
