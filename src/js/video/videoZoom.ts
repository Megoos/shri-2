const videoContainers: NodeListOf<HTMLDivElement> = document.querySelectorAll('.info-item');
const wrapper: HTMLDivElement | null = document.querySelector('.wrapper');
const backLayer: HTMLDivElement | null = document.querySelector('.back-layer');

function transformation(container: HTMLDivElement) {
  if (!document.documentElement || !wrapper) {
    return {
      translate: { x: 0, y: 0 },
      scale: 1
    };
  }

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

function zoomVideo(videoNum: string) {
  const container = videoContainers[parseInt(videoNum, 10) - 1];

  const { [videoNum]: state } = store.getState();

  if (state.isActive) {
    const { translate, scale } = transformation(container);

    container.style.transform = `translate(${translate.x}px, ${translate.y}px) scale(${scale})`;
    container.classList.add('active');
    wrapper && wrapper.classList.add('fullscreen');
    backLayer && backLayer.classList.add('active');
  } else {
    container.style.transform = `translate(0px, 0px) scale(1)`;
    backLayer && backLayer.classList.remove('active');
    setTimeout(() => {
      container.classList.remove('active');
      wrapper && wrapper.classList.remove('fullscreen');
    }, 300);
  }
}

videos.forEach(video => {
  const { videoNum } = video.dataset;

  if (!videoNum) {
    return;
  }

  const { [videoNum]: state } = store.getState();

  video.style.filter = `brightness(${state.brightness}%) contrast(${state.contrast}%)`;
  state.isActive && zoomVideo(videoNum);

  video.addEventListener('mousedown', function() {
    store.dispatch({
      type: 'CHANGE_ACTIVE',
      payload: {
        num: videoNum
      }
    });

    requestAnimationFrame(() => {
      zoomVideo(videoNum);
    });
  });
});
