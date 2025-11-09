


document.addEventListener("DOMContentLoaded", function() {
    // Verifica si ya se ha aceptado las cookies
    if (!localStorage.getItem("cookiesAccepted")) {
      document.getElementById("cookie-banner").style.display = "block";
    }
  
    document.getElementById("accept-cookies").addEventListener("click", function() {
      // Almacena la aceptación en localStorage
      localStorage.setItem("cookiesAccepted", "true");
      document.getElementById("cookie-banner").style.display = "none"; // Oculta el banner
    });
  });
  





const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  nav.classList.toggle("show");
});





let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}
//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}
// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 8000)
function showSlider(){
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 8000)
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})








// buscadorrr







// Novedades script-------------------------------------------------

const novedadesSlides = document.querySelectorAll('.novedades-slide');
let novedadesCurrentIndex = 0;

function novedadesShowSlide(index) {
  novedadesSlides.forEach((slide, i) => {
    slide.classList.remove('novedades-active');
    if (i === index) {
      slide.classList.add('novedades-active');
    }
  });
}

function novedadesChangeSlide(direction) {
  novedadesCurrentIndex += direction;
  if (novedadesCurrentIndex < 0) novedadesCurrentIndex = novedadesSlides.length - 1;
  if (novedadesCurrentIndex >= novedadesSlides.length) novedadesCurrentIndex = 0;
  novedadesShowSlide(novedadesCurrentIndex);
}

setInterval(() => novedadesChangeSlide(1), 7000);






