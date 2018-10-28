function initVideo(video: HTMLVideoElement, url: string): void {
  if ((window as any).Hls.isSupported()) {
    let hls = new (window as any).Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
    hls.on((window as any).Hls.Events.MANIFEST_PARSED, function() {
      video.play();
    });
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
    video.addEventListener('loadedmetadata', function() {
      video.play();
    });
  }
}

initVideo(
  document.querySelector<HTMLVideoElement>('#video-1'),
  'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8'
);

initVideo(
  document.querySelector<HTMLVideoElement>('#video-2'),
  'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fcat%2Fmaster.m3u8'
);

initVideo(
  document.querySelector<HTMLVideoElement>('#video-3'),
  'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8'
);

initVideo(
  document.querySelector<HTMLVideoElement>('#video-4'),
  'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fhall%2Fmaster.m3u8'
);
