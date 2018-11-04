interface Obj {
  [key: string]: any;
}

interface ActionType {
  type: string;
  payload: {
    num: '1' | '2' | '3' | '4',
    isActive?: boolean,
    isMuted?: boolean,
    brightness?: string,
    contrast?: string
  };
}

const initialStateControls = {
  1: {
    isMuted: true,
    brightness: '100',
    contrast: '100',
    isActive: false
  },
  2: {
    isMuted: true,
    brightness: '100',
    contrast: '100',
    isActive: false
  },
  3: {
    isMuted: true,
    brightness: '100',
    contrast: '100',
    isActive: false
  },
  4: {
    isMuted: true,
    brightness: '100',
    contrast: '100',
    isActive: false
  }
};

// reducer
function controls(state: any, action: ActionType) {
  switch (action.type) {
    case 'CHANGE_ACTIVE':
      return { ...state, [action.payload.num]: { ...state[action.payload.num], isActive: !state[action.payload.num].isActive } };

    case 'CHANGE_MUTED':
      return { ...state, [action.payload.num]: { ...state[action.payload.num], isMuted: !state[action.payload.num].isMuted } };

    case 'CHANGE_BRIGHTNESS':
      return { ...state, [action.payload.num]: { ...state[action.payload.num], brightness: action.payload.brightness } };

    case 'CHANGE_CONTRAST':
      return { ...state, [action.payload.num]: { ...state[action.payload.num], contrast: action.payload.contrast } };

    default:
      return state;
  }
}

const storageStore = localStorage.getItem('store');
const store = new Flux(controls, storageStore ? JSON.parse(storageStore) : initialStateControls);

store.subscribe(() => {
  console.log(store.getState());
  localStorage.setItem('store', JSON.stringify(store.getState()));
});
