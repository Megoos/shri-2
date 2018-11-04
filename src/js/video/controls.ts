let videos: NodeListOf<HTMLVideoElement> = document.querySelectorAll('.video');
let inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.video-range__input');
let muteButtons: NodeListOf<HTMLElement> = document.querySelectorAll('.mute-button');

// изменение яркости и контрастности
inputs.forEach(input => {
  const { videoNum, type } = input.dataset;
  if (!videoNum || !type) {
    return;
  }

  const { [videoNum]: state } = store.getState();

  input.value = state[type];
  input.nextElementSibling && (input.nextElementSibling.textContent = state[type] + '%');

  input.oninput = function(event) {
    const target = event.target as HTMLInputElement;
    const { videoNum, type } = target.dataset;
    if (videoNum && type) {
      const video = videos[parseInt(videoNum, 10) - 1];
      target.nextElementSibling && (target.nextElementSibling.textContent = target.value + '%');

      if (type === 'brightness') {
        store.dispatch({
          type: 'CHANGE_BRIGHTNESS',
          payload: {
            num: videoNum,
            brightness: target.value
          }
        });
      } else if (type === 'contrast') {
        store.dispatch({
          type: 'CHANGE_CONTRAST',
          payload: {
            num: videoNum,
            contrast: target.value
          }
        });
      }

      const { [videoNum]: state } = store.getState();

      video.style.filter = `brightness(${state.brightness}%) contrast(${state.contrast}%)`;
    }
  };
});

// анализатор звука
function analyserInit(video: HTMLVideoElement) {
  const context = new ((window as any).AudioContext || (window as any).webkitAudioContext)();
  const source = context.createMediaElementSource(video);
  const analyser = context.createAnalyser();
  analyser.smoothingTimeConstant = 0.1;
  analyser.fftSize = 32;
  let data = new Uint8Array(analyser.frequencyBinCount);
  const canvas = video.parentNode && video.parentNode.querySelector<HTMLCanvasElement>('.video-canvas');
  const canvasWrapper = video.parentNode && video.parentNode.querySelector<HTMLDivElement>('.video-analyzer_block');

  if (!canvas || !canvasWrapper) {
    return;
  }

  const ctx = canvas.getContext('2d');
  if (canvas && canvasWrapper && ctx) {
    setInterval(function() {
      analyser.getByteFrequencyData(data);
      let v = 0;
      for (let i = 0; i < data.length; i++) {
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

videos.forEach(video => {
  analyserInit(video);
});

// включение и выключение зввука
muteButtons.forEach((mute) => {
  const video = (mute.parentNode as HTMLElement).previousElementSibling as HTMLVideoElement;
  const { videoNum } = video.dataset;

  if (!videoNum) {
    return;
  }

  const { [videoNum]: state } = store.getState();
  video.muted = state.isMuted;
  mute.textContent = state.isMuted ? 'off' : 'on';
  mute.style.backgroundColor = state.isMuted ? 'red' : 'green';

  mute.onclick = function() {
    store.dispatch({
      type: 'CHANGE_MUTED',
      payload: {
        num: videoNum
      }
    });

    const { [videoNum]: state } = store.getState();

    video.muted = state.isMuted;
    mute.textContent = state.isMuted ? 'off' : 'on';
    mute.style.backgroundColor = state.isMuted ? 'red' : 'green';
  };
});
