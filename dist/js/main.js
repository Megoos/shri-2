"use strict";
// открытие меню в мобильной версии
var hamburger = document.querySelectorAll('.hamburger-menu-link');
var closeEl = document.querySelectorAll('.close');
var menu = document.querySelectorAll('.device-menu');
closeEl[0].onclick = function (event) {
    event.preventDefault();
    menu[0].style.display = 'none';
};
hamburger[0].onclick = function (event) {
    event.preventDefault();
    menu[0].style.display = 'block';
};
