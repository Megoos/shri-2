"use strict";
var videos = document.querySelectorAll('.video');
var inputs = document.querySelectorAll('.video-range__input');
var muteButtons = document.querySelectorAll('.mute-button');
// изменение яркости и контрастности
inputs.forEach(function (input) {
    input.oninput = function (event) {
        var target = event.target;
        var _a = target.dataset, videoNum = _a.videoNum, type = _a.type;
        if (videoNum && type) {
            var video = videos[parseInt(videoNum, 10) - 1];
            target.nextElementSibling && (target.nextElementSibling.textContent = target.value + '%');
            video.dataset[type] = target.value;
            var _b = video.dataset, brightness = _b.brightness, contrast = _b.contrast;
            video.style.filter = "brightness(" + brightness + "%) contrast(" + contrast + "%)";
        }
    };
});
// анализатор звука
function analyserInit(video) {
    var context = new (window.AudioContext || window.webkitAudioContext)();
    var source = context.createMediaElementSource(video);
    var analyser = context.createAnalyser();
    analyser.smoothingTimeConstant = 0.1;
    analyser.fftSize = 32;
    var data = new Uint8Array(analyser.frequencyBinCount);
    var canvas = video.parentNode && video.parentNode.querySelector('.video-canvas');
    var canvasWrapper = video.parentNode && video.parentNode.querySelector('.video-analyzer_block');
    if (!canvas || !canvasWrapper) {
        return;
    }
    var ctx = canvas.getContext('2d');
    if (canvas && canvasWrapper && ctx) {
        setInterval(function () {
            analyser.getByteFrequencyData(data);
            var v = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i] > v) {
                    v = data[i];
                }
            }
            canvas.height = canvasWrapper.offsetHeight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#fdf036';
            ctx.fillRect(0, 0, 30, v / 2);
        }, 100);
        source.connect(analyser);
        analyser.connect(context.destination);
    }
}
videos.forEach(function (video) {
    analyserInit(video);
});
// включение и выключение зввука
muteButtons.forEach(function (mute) {
    mute.onclick = function () {
        var video = mute.parentNode.previousElementSibling;
        if (video.muted) {
            video.muted = false;
            mute.textContent = 'on';
            mute.style.backgroundColor = 'green';
        }
        else {
            video.muted = true;
            mute.textContent = 'off';
            mute.style.backgroundColor = 'red';
        }
    };
});
