class Flux {
  private currentReducer: Function;
  private currentState: any;
  private listener: Function;

  constructor(reducer: Function, initialState: any) {
    this.currentReducer = reducer;
    this.currentState = initialState;
    this.listener = () => {};
  }

  dispatch(action: {type: string, payload?: any}) {
    this.currentState = this.currentReducer(this.currentState, action);
    this.listener();
    return action;
  }

  subscribe(newListener: Function) {
    this.listener = newListener;
  }

  getState() {
    return this.currentState;
  }
}
