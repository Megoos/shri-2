const videoContainers=document.querySelectorAll(".info-item"),wrapper=document.querySelector(".wrapper"),backLayer=document.querySelector(".back-layer");function transformation(e){const{clientWidth:t,clientHeight:s}=document.documentElement,a=t/2,r=s/2,{clientWidth:n,clientHeight:o}=e;return{translate:{x:a-(n/2+e.offsetLeft),y:r-(o/2+e.offsetTop-wrapper.scrollTop)},scale:Math.min(t/n,s/o)}}function zoomVideo(e){const t=videoContainers[parseInt(e,10)-1];if(wrapper.classList.contains("fullscreen"))t.style.transform="translate(0px, 0px) scale(1)",backLayer.classList.remove("active"),setTimeout(()=>{t.classList.remove("active"),wrapper.classList.remove("fullscreen")},300);else{const{translate:e,scale:s}=transformation(t);t.style.transform=`translate(${e.x}px, ${e.y}px) scale(${s})`,t.classList.add("active"),wrapper.classList.add("fullscreen"),backLayer.classList.add("active")}}videos.forEach(e=>{e.addEventListener("mousedown",function(){const{videoNum:e}=this.dataset;requestAnimationFrame(()=>{zoomVideo(e)})})});