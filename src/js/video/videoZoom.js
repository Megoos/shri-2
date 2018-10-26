const videoContainers = document.querySelectorAll('.info-item');
const wrapper = document.querySelector('.wrapper');
const backLayer = document.querySelector('.back-layer');

function transformation(container) {
    const { clientWidth: docWidth, clientHeight: docHeight } = document.documentElement;
    const viewCenter = { x: docWidth / 2, y: docHeight / 2 };
    const { clientWidth: elWidth, clientHeight: elHeight } = container;
    const elCenter = {
        x: elWidth / 2 + container.offsetLeft,
        y: elHeight / 2 + container.offsetTop - wrapper.scrollTop
    };
    const transform = {
        translate: { x: viewCenter.x - elCenter.x, y: viewCenter.y - elCenter.y },
        scale: Math.min(docWidth / elWidth, docHeight / elHeight)
    };

    return transform;
}

function zoomVideo(videoNum) {
    const container = videoContainers[parseInt(videoNum, 10) - 1];

    if (!wrapper.classList.contains('fullscreen')) {
        const { translate, scale } = transformation(container);

        container.style.transform = `translate(${translate.x}px, ${translate.y}px) scale(${scale})`;
        container.classList.add('active');
        wrapper.classList.add('fullscreen');
        backLayer.classList.add('active');
    } else {
        container.style.transform = `translate(0px, 0px) scale(1)`;
        backLayer.classList.remove('active');
        setTimeout(() => {
            container.classList.remove('active');
            wrapper.classList.remove('fullscreen');
        }, 300);
    }
}

videos.forEach(video => {
    video.addEventListener('mousedown', function() {
        const { videoNum } = this.dataset;
        requestAnimationFrame(() => {
            zoomVideo(videoNum);
        });
    });
});
