// открытие меню в мобильной версии
const hamburger: NodeListOf<HTMLDivElement> = document.querySelectorAll('.hamburger-menu-link');
const closeEl: NodeListOf<HTMLDivElement> = document.querySelectorAll('.close');
const menu: NodeListOf<HTMLDivElement> = document.querySelectorAll('.device-menu');

closeEl[0].onclick = function(event: MouseEvent): void {
  event.preventDefault();
  menu[0].style.display = 'none';
};

hamburger[0].onclick = function(event: MouseEvent): void {
  event.preventDefault();
  menu[0].style.display = 'block';
};
