class Flux {
  private currentReducer: Function;
  private currentState: any;
  private listeners: Array<Function> = [];

  constructor(reducer: Function, initialState: any) {
    this.currentReducer = reducer;
    this.currentState = initialState;
    this.listeners = [];
  }

  dispatch(action: {type: string, payload?: any}) {
    this.currentState = this.currentReducer(this.currentState, action);
    this.listeners.forEach((listener) => listener(this.currentState));
    return action;
  }

  subscribe(newListener: Function) {
    this.listeners = [...this.listeners, newListener];
  }

  unsubscribe(oldListener: Function) {
    this.listeners = this.listeners.filter((listener) => listener !== oldListener);
  }

  getState() {
    return this.currentState;
  }
}
