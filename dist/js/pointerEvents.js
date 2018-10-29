"use strict";var PointerEventTouch=function(){var t=function(t,e){return t>e?e:t<1?1:t},e=function(t,e,i){return t>e*i-e?e*i-e:t<e-e*i?e-e*i:t},i=function(t){return t>200?200:t<0?0:t};return function(){function n(t,e,i){this.maxZoom=4,this.evCache=[],this.prevDiff=-1,this.startMoveX=-1,this.startMoveY=-1,this.el=t,this.zoom=1.5,this.elWidth=e,this.elHeight=i,this.currentLeft=0,this.currentBottom=0,this.currentBrightness=100,this.prevRotate=-1,this.action="none"}return n.prototype.pointerupHandler=function(t){this.evCache=function(t,e){for(var i=0;i<e.length;i++)if(e[i].pointerId===t.pointerId){e.splice(i,1);break}return e}(t,this.evCache),this.action="none",this.startMoveX=-1,this.startMoveY=-1},n.prototype.pointerdownHandler=function(t){this.evCache.push(t),this.startMoveX=t.clientX,this.startMoveY=t.clientY},n.prototype.pointermoveHandler=function(n){for(var r=0;r<this.evCache.length;r++)if(n.pointerId===this.evCache[r].pointerId){this.evCache[r]=n;break}if(2===this.evCache.length){var o=Math.sqrt(Math.pow(this.evCache[0].clientX-this.evCache[1].clientX,2)+Math.pow(this.evCache[0].clientY-this.evCache[1].clientY,2))/3e3,s=Math.abs(180*Math.atan2(this.evCache[0].clientY-this.evCache[1].clientY,this.evCache[0].clientX-this.evCache[1].clientX)/Math.PI*.02);if(2.85*o>s&&"rotate"!==this.action||"zoom"===this.action){o>this.prevDiff&&(this.zoom=t(o+this.zoom,this.maxZoom),this.el.style.transform="scale("+this.zoom+")"),o<this.prevDiff&&(this.zoom=t(this.zoom-o,this.maxZoom),this.el.style.transform="scale("+this.zoom+")",this.currentLeft=e(this.currentLeft,this.elWidth,this.zoom),this.currentBottom=e(this.currentBottom,this.elHeight,this.zoom),this.el.style.left=this.currentLeft+"px",this.el.style.bottom=this.currentBottom+"px"),this.action="zoom";var h=document.getElementById("zoom");h&&(h.textContent="1 : "+this.zoom.toFixed(2))}else if(this.prevRotate>1.9||"rotate"===this.action){s>this.prevRotate&&(this.currentBrightness=i(s+this.currentBrightness)),s<this.prevRotate&&(this.currentBrightness=i(this.currentBrightness-s)),this.el.style.filter="brightness("+this.currentBrightness.toFixed(0)+"%)",this.action="rotate";var a=document.getElementById("brightness");a&&(a.textContent=this.currentBrightness.toFixed(0)+"%")}this.prevRotate=s,this.prevDiff=o}else if(this.startMoveX>0||this.startMoveY>0){var c=n.clientX-this.startMoveX,u=this.startMoveY-n.clientY;this.currentLeft=e(this.currentLeft+c,this.elWidth,this.zoom),this.currentBottom=e(this.currentBottom+u,this.elHeight,this.zoom),this.el.style.left=this.currentLeft+"px",this.el.style.bottom=this.currentBottom+"px",this.startMoveX=n.clientX,this.startMoveY=n.clientY}},n}()}();function init(){var t=document.querySelector("#camImage");if(t){t.oncontextmenu=function(t){return t.preventDefault(),t.stopPropagation(),!1};var e=new PointerEventTouch(t,t.offsetWidth/2,t.offsetHeight/2);t.addEventListener("pointerdown",function(t){return e.pointerdownHandler(t)}),t.addEventListener("pointermove",function(t){return e.pointermoveHandler(t)}),t.addEventListener("pointerup",function(t){return e.pointerupHandler(t)}),t.addEventListener("pointercancel",function(t){return e.pointerupHandler(t)}),t.addEventListener("pointerout",function(t){return e.pointerupHandler(t)}),t.addEventListener("pointerleave",function(t){return e.pointerupHandler(t)})}}window.onload=function(){init()};