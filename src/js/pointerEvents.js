const maxZoom = 4;

var evCache = new Array();
var prevDiff = -1;
var startMoveX = -1;
var startMoveY = -1;

var el;
var zoom = 1.5;

var elWidth = 0;
var elHeight = 0;

var currentLeft = 0;
var currentBottom = 0;
var currentBrightness = 100;
var prevRotate = -1;
var action = 'none';

function pointerup_handler(ev) {
    // console.log(ev.type, ev);
    remove_event(ev);
    action = 'none';
    startMoveX = -1;
    startMoveY = -1;
}

function remove_event(ev) {
    // Удаление текущего эвента из массива
    for (var i = 0; i < evCache.length; i++) {
        if (evCache[i].pointerId == ev.pointerId) {
            evCache.splice(i, 1);
            break;
        }
    }
}

function pointerdown_handler(ev) {
    // Добавление эвента в массив событий
    //console.log('pointerDown', ev);
    evCache.push(ev);
    startMoveX = ev.clientX;
    startMoveY = ev.clientY;
}

function scale(scale) {
    if (scale > maxZoom) {
        return maxZoom;
    }

    if (scale < 1) {
        return 1;
    }

    return scale;
}

function positionX(x) {
    if (x > elWidth * zoom - elWidth) {
        return elWidth * zoom - elWidth;
    }

    if (x < elWidth - elWidth * zoom) {
        return elWidth - elWidth * zoom;
    }

    return x;
}

function positionY(y) {
    if (y > elHeight * zoom - elHeight) {
        return elHeight * zoom - elHeight;
    }

    if (y < elHeight - elHeight * zoom) {
        return elHeight - elHeight * zoom;
    }

    return y;
}

function brightness(value) {
    if (value > 200) {
        return 200;
    }

    if (value < 0) {
        return 0;
    }

    return value;
}

function pointermove_handler(ev) {
    //console.log('pointerMove', ev);
    // Поиск текущего эвента в массиве событий
    for (var i = 0; i < evCache.length; i++) {
        if (ev.pointerId == evCache[i].pointerId) {
            evCache[i] = ev;
            break;
        }
    }

    // Если два касания
    if (evCache.length == 2) {
        // Вычисление дистанции между касаниями
        var curDiff =
            Math.sqrt(
                Math.pow(evCache[0].clientX - evCache[1].clientX, 2) +
                    Math.pow(evCache[0].clientY - evCache[1].clientY, 2)
            ) / 3000;
        
        // Вычисление угла между касаниями
        var curRotate =
            Math.abs(((Math.atan2(
                evCache[0].clientY - evCache[1].clientY,
                evCache[0].clientX - evCache[1].clientX
            ) * 180) / Math.PI) * 0.02);

        if (curDiff * 2.8 > curRotate && action !== 'rotate' || action === 'zoom') {
            if (curDiff > prevDiff) {
                // Приближение
                zoom = scale(curDiff + zoom);
                el.style.transform = `scale(${zoom})`;
            }
            if (curDiff < prevDiff) {
                // Отдаление
                zoom = scale(zoom - curDiff);
                el.style.transform = `scale(${zoom})`;
                currentLeft = positionX(currentLeft);
                currentBottom = positionY(currentBottom);
                el.style.left = currentLeft + 'px';
                el.style.bottom = currentBottom + 'px';
            }
            action = 'zoom';
            document.getElementById('zoom').textContent = `1 : ${zoom.toFixed(2)}`;
        }
        // Поворот
        else if (prevRotate > 1.9 || action === 'rotate') {
            if (curRotate > prevRotate) {
                currentBrightness = brightness(curRotate + currentBrightness);
            }

            if (curRotate < prevRotate) {
                currentBrightness = brightness(currentBrightness - curRotate);
            }

            el.style.filter = `brightness(${currentBrightness.toFixed(0)}%)`;
            action = 'rotate';
            document.getElementById('brightness').textContent = currentBrightness.toFixed(0) + '%';
        }

        prevRotate = curRotate;
        prevDiff = curDiff;

    } else {
        // Движение вверх / вниз / влево / вправо
        if (startMoveX > 0 || startMoveY > 0) {
            const diffMoveX = (ev.clientX - startMoveX)
            const diffMoveY = (startMoveY - ev.clientY);
            currentLeft = positionX(currentLeft + diffMoveX);
            currentBottom = positionY(currentBottom + diffMoveY);
            el.style.left = currentLeft + 'px';
            el.style.bottom = currentBottom + 'px';
            startMoveX = ev.clientX;
            startMoveY = ev.clientY;
        }
    }
}

function init() {
    el = document.getElementById('camImage');

    el.oncontextmenu = function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    };

    elHeight = el.offsetHeight / 2;
    elWidth = el.offsetWidth / 2;

    el.addEventListener('pointerdown', pointerdown_handler);
    el.addEventListener('pointermove', pointermove_handler);

    el.addEventListener('pointerup', pointerup_handler);
    el.addEventListener('pointercancel', pointerup_handler);
    el.addEventListener('pointerout', pointerup_handler);
    el.addEventListener('pointerleave', pointerup_handler);
}

window.onload = function() {
    init();
};
