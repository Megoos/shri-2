# ДЗ - «Адаптивная вёрстка»

В этом репозитории находятся выполненное ДЗ - «Адаптивная вёрстка»

## Запуск
```
npm i
gulp
```

## Описание этапов выполнения задания

Для автоматизации разработки и билда был выбран gulp и необходимые модули для удобства.

- Данные находятся в файле `events.js` исхдный json присвоен `const data` для удобства.
- В файле `cropText.js` реализовано обрезание многострочного текста заголовков.
- Шаблонизация выполнена с помощью элемента `<template>`. Обработка шаблона находиться в `template.js` основные элементы находятся в шаблоне, также генерация дополнительных элементов выполняется на стороне js, c помощью универсальной функции `create()`.
- Для медиа запросов используются миксины, основные значения вынесены в константы (цвета, разрешения экранов).
- Иконки упакованы в `sprite.svg`. Применил адаптивную типографику в местах где это позволяли пропорции.
- Для вставки адаптивных изображений использовал `srcset`.

Собранный проект находится в папке `dist`.

Ссылка на страницу: https://megoos.github.io/shri-1/dist/