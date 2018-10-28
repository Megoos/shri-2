// открытие меню в мобильной версии
const hamburger: NodeListOf<HTMLVideoElement> = document.querySelectorAll('.hamburger-menu-link');
const closeEl: NodeListOf<HTMLVideoElement> = document.querySelectorAll('.close');
const menu: NodeListOf<HTMLVideoElement> = document.querySelectorAll('.device-menu');

closeEl[0].onclick = function(event) {
  event.preventDefault();
  menu[0].style.display = 'none';
};

hamburger[0].onclick = function(event) {
  event.preventDefault();
  menu[0].style.display = 'block';
};
