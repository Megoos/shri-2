interface Window {
  AudioContext: {
    new(): AudioContext;
  };
  webkitAudioContext: {
    new(): AudioContext;
  };
  Hls: {
    new(): IHls;
    Events: { MANIFEST_PARSED: object };
    isSupported: () => boolean;
  };
}

interface IHls { 
  loadSource: Function;
  attachMedia: Function;
  on: Function;
}