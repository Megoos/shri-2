for(var list=document.body.getElementsByClassName("info-item__title"),i=0;i<list.length;i++)cropTextToFit(list[i]);function cropTextToFit(t){var e,i=t.innerHTML;for(t.title?(t.innerHTML=t.title,i=t.title):t.title=i;t.scrollHeight>t.clientHeight;){if(-1===(e=i.lastIndexOf(" ")))return;i=i.substring(0,e),t.innerHTML=i+"…"}}window.addEventListener("resize",function(){for(var t=document.body.getElementsByClassName("info-item__title"),e=0;e<t.length;e++)cropTextToFit(t[e])},!0);