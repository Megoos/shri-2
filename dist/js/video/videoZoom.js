var videoContainers = document.querySelectorAll('.info-item');
var wrapper = document.querySelector('.wrapper');
var backLayer = document.querySelector('.back-layer');
function transformation(container) {
    var _a = document.documentElement, docWidth = _a.clientWidth, docHeight = _a.clientHeight;
    var viewCenter = { x: docWidth / 2, y: docHeight / 2 };
    var elWidth = container.clientWidth, elHeight = container.clientHeight;
    var elCenter = {
        x: elWidth / 2 + container.offsetLeft,
        y: elHeight / 2 + container.offsetTop - wrapper.scrollTop
    };
    var transform = {
        translate: { x: viewCenter.x - elCenter.x, y: viewCenter.y - elCenter.y },
        scale: Math.min(docWidth / elWidth, docHeight / elHeight)
    };
    return transform;
}
function zoomVideo(videoNum) {
    var container = videoContainers[parseInt(videoNum, 10) - 1];
    if (!wrapper.classList.contains('fullscreen')) {
        var _a = transformation(container), translate = _a.translate, scale = _a.scale;
        container.style.transform = "translate(" + translate.x + "px, " + translate.y + "px) scale(" + scale + ")";
        container.classList.add('active');
        wrapper.classList.add('fullscreen');
        backLayer.classList.add('active');
    }
    else {
        container.style.transform = "translate(0px, 0px) scale(1)";
        backLayer.classList.remove('active');
        setTimeout(function () {
            container.classList.remove('active');
            wrapper.classList.remove('fullscreen');
        }, 300);
    }
}
videos.forEach(function (video) {
    video.addEventListener('mousedown', function () {
        var videoNum = this.dataset.videoNum;
        requestAnimationFrame(function () {
            zoomVideo(videoNum);
        });
    });
});
