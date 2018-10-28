let videos: NodeListOf<HTMLVideoElement> = document.querySelectorAll('.video');
let inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.video-range__input');
let muteButtons: NodeListOf<HTMLElement> = document.querySelectorAll('.mute-button');

// изменение яркости и контрастности
inputs.forEach(input => {
  input.oninput = function(event) {
    const target = event.target as HTMLInputElement;
    const { videoNum, type } = target.dataset;
    const video = videos[parseInt(videoNum, 10) - 1];
    target.nextElementSibling.textContent = target.value + '%';

    video.dataset[type] = target.value;
    const { brightness, contrast } = video.dataset;
    video.style.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
  };
});
// анализатор звука
function analyserInit(video) {
  const context = new ((window as any).AudioContext || (window as any).webkitAudioContext)();
  const source = context.createMediaElementSource(video);
  const analyser = context.createAnalyser();
  analyser.smoothingTimeConstant = 0.1;
  analyser.fftSize = 32;
  let data = new Uint8Array(analyser.frequencyBinCount);
  const canvas = video.parentNode.querySelector('.video-canvas');
  const canvasWrapper = video.parentNode.querySelector('.video-analyzer_block');

  const ctx = canvas.getContext('2d');
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

videos.forEach(video => {
  analyserInit(video);
});

// включение и выключение зввука
muteButtons.forEach((mute) => {
  mute.onclick = function() {
    const video = (mute.parentNode as HTMLElement).previousElementSibling as HTMLVideoElement;

    if (video.muted) {
      video.muted = false;
      mute.textContent = 'on';
      mute.style.backgroundColor = 'green';
    } else {
      video.muted = true;
      mute.textContent = 'off';
      mute.style.backgroundColor = 'red';
    }
  };
});
