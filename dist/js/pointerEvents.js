var PointerEventTouch = (function () {
    var _scale = function (scale, maxZoom) {
        if (scale > maxZoom) {
            return maxZoom;
        }
        if (scale < 1) {
            return 1;
        }
        return scale;
    };
    var _position = function (x, el, zoom) {
        if (x > el * zoom - el) {
            return el * zoom - el;
        }
        if (x < el - el * zoom) {
            return el - el * zoom;
        }
        return x;
    };
    var _brightness = function (value) {
        if (value > 200) {
            return 200;
        }
        if (value < 0) {
            return 0;
        }
        return value;
    };
    var _removeEvent = function (ev, evCache) {
        // Удаление текущего эвента из массива
        for (var i = 0; i < evCache.length; i++) {
            if (evCache[i].pointerId === ev.pointerId) {
                evCache.splice(i, 1);
                break;
            }
        }
        return evCache;
    };
    var PointerEventTouch = /** @class */ (function () {
        function PointerEventTouch(el, width, height) {
            this.maxZoom = 4;
            this.evCache = [];
            this.prevDiff = -1;
            this.startMoveX = -1;
            this.startMoveY = -1;
            this.el = el;
            this.zoom = 1.5;
            this.elWidth = width;
            this.elHeight = height;
            this.currentLeft = 0;
            this.currentBottom = 0;
            this.currentBrightness = 100;
            this.prevRotate = -1;
            this.action = 'none';
        }
        PointerEventTouch.prototype.pointerupHandler = function (ev) {
            // console.log(ev.type, ev);
            this.evCache = _removeEvent(ev, this.evCache);
            this.action = 'none';
            this.startMoveX = -1;
            this.startMoveY = -1;
        };
        PointerEventTouch.prototype.pointerdownHandler = function (ev) {
            // Добавление эвента в массив событий
            // console.log('pointerDown', ev);
            this.evCache.push(ev);
            this.startMoveX = ev.clientX;
            this.startMoveY = ev.clientY;
        };
        PointerEventTouch.prototype.pointermoveHandler = function (ev) {
            // console.log('pointerMove', ev);
            // Поиск текущего эвента в массиве событий
            for (var i = 0; i < this.evCache.length; i++) {
                if (ev.pointerId === this.evCache[i].pointerId) {
                    this.evCache[i] = ev;
                    break;
                }
            }
            // Если два касания
            if (this.evCache.length === 2) {
                // Вычисление дистанции между касаниями
                var curDiff = Math.sqrt(Math.pow(this.evCache[0].clientX - this.evCache[1].clientX, 2) +
                    Math.pow(this.evCache[0].clientY - this.evCache[1].clientY, 2)) / 3000;
                // Вычисление угла между касаниями
                var curRotate = Math.abs(((Math.atan2(this.evCache[0].clientY - this.evCache[1].clientY, this.evCache[0].clientX - this.evCache[1].clientX) *
                    180) /
                    Math.PI) *
                    0.02);
                if ((curDiff * 2.85 > curRotate && this.action !== 'rotate') || this.action === 'zoom') {
                    if (curDiff > this.prevDiff) {
                        // Приближение
                        this.zoom = _scale(curDiff + this.zoom, this.maxZoom);
                        this.el.style.transform = "scale(" + this.zoom + ")";
                    }
                    if (curDiff < this.prevDiff) {
                        // Отдаление
                        this.zoom = _scale(this.zoom - curDiff, this.maxZoom);
                        this.el.style.transform = "scale(" + this.zoom + ")";
                        this.currentLeft = _position(this.currentLeft, this.elWidth, this.zoom);
                        this.currentBottom = _position(this.currentBottom, this.elHeight, this.zoom);
                        this.el.style.left = this.currentLeft + 'px';
                        this.el.style.bottom = this.currentBottom + 'px';
                    }
                    this.action = 'zoom';
                    document.getElementById('zoom').textContent = "1 : " + this.zoom.toFixed(2);
                }
                else if (this.prevRotate > 1.9 || this.action === 'rotate') {
                    // Поворот
                    if (curRotate > this.prevRotate) {
                        this.currentBrightness = _brightness(curRotate + this.currentBrightness);
                    }
                    if (curRotate < this.prevRotate) {
                        this.currentBrightness = _brightness(this.currentBrightness - curRotate);
                    }
                    this.el.style.filter = "brightness(" + this.currentBrightness.toFixed(0) + "%)";
                    this.action = 'rotate';
                    document.getElementById('brightness').textContent =
                        this.currentBrightness.toFixed(0) + '%';
                }
                this.prevRotate = curRotate;
                this.prevDiff = curDiff;
            }
            else {
                // Движение вверх / вниз / влево / вправо
                if (this.startMoveX > 0 || this.startMoveY > 0) {
                    var diffMoveX = ev.clientX - this.startMoveX;
                    var diffMoveY = this.startMoveY - ev.clientY;
                    this.currentLeft = _position(this.currentLeft + diffMoveX, this.elWidth, this.zoom);
                    this.currentBottom = _position(this.currentBottom + diffMoveY, this.elHeight, this.zoom);
                    this.el.style.left = this.currentLeft + 'px';
                    this.el.style.bottom = this.currentBottom + 'px';
                    this.startMoveX = ev.clientX;
                    this.startMoveY = ev.clientY;
                }
            }
        };
        return PointerEventTouch;
    }());
    return PointerEventTouch;
})();
// TODO: Work with multiple items
function init() {
    var el = document.getElementById('camImage');
    el.oncontextmenu = function (event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    };
    var item = new PointerEventTouch(el, el.offsetWidth / 2, el.offsetHeight / 2);
    el.addEventListener('pointerdown', function (ev) { return item.pointerdownHandler(ev); });
    el.addEventListener('pointermove', function (ev) { return item.pointermoveHandler(ev); });
    el.addEventListener('pointerup', function (ev) { return item.pointerupHandler(ev); });
    el.addEventListener('pointercancel', function (ev) { return item.pointerupHandler(ev); });
    el.addEventListener('pointerout', function (ev) { return item.pointerupHandler(ev); });
    el.addEventListener('pointerleave', function (ev) { return item.pointerupHandler(ev); });
}
window.onload = function () {
    init();
};
