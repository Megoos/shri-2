"use strict";
// function createStore(reducer, initialState) {
//   var currentReducer = reducer;
//   var currentState = initialState;
//   var listener = () => {};
var Flux = /** @class */ (function () {
    function Flux(reducer, initialState) {
        this.currentReducer = reducer;
        this.currentState = initialState;
        this.listener = function () { };
    }
    Flux.prototype.dispatch = function (action) {
        this.currentState = this.currentReducer(this.currentState, action);
        this.listener();
        return action;
    };
    Flux.prototype.subscribe = function (newListener) {
        this.listener = newListener;
    };
    Flux.prototype.getState = function () {
        return this.currentState;
    };
    return Flux;
}());
