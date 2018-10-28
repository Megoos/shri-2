let videos = document.querySelectorAll('.video');
let inputs = document.querySelectorAll('.video-range__input');
let muteButtons = document.querySelectorAll('.mute-button');

// изменение яркости и контрастности
inputs.forEach(input => {
  input.oninput = function() {
    const { videoNum, type } = this.dataset;
    const video = videos[parseInt(videoNum, 10) - 1];
    this.nextElementSibling.textContent = this.value + '%';

    video.dataset[type] = this.value;
    const { brightness, contrast } = video.dataset;
    video.style.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
  };
});
// анализатор звука
function analyserInit(video) {
  const context = new (window.AudioContext || window.webkitAudioContext)();
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
muteButtons.forEach(mute => {
  mute.onclick = function() {
    const video = mute.parentNode.previousElementSibling;

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
