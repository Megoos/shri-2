//открытие меню в мобильной версии
const hamburger = document.querySelectorAll('.hamburger-menu-link');
const close = document.querySelectorAll('.close');
const menu = document.querySelectorAll('.device-menu');

close[0].onclick = function(event) {
    event.preventDefault();
    menu[0].style.display = 'none';
};

hamburger[0].onclick = function(event) {
    event.preventDefault();
    menu[0].style.display = 'block';
};
