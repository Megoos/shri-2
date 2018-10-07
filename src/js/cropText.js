var list = document.body.getElementsByClassName('info-item__title');
for (var i = 0; i < list.length; i++) {
    cropTextToFit(list[i]);
}

function cropTextToFit(o) {
    var lastIndex;
    var txt = o.innerHTML;
    if (!o.title) {
      o.title = txt;
    } else {
      o.innerHTML = o.title;
      txt = o.title;
    }    

    while (o.scrollHeight > o.clientHeight) {
        lastIndex = txt.lastIndexOf(' ');
        if (lastIndex == -1) return;
        txt = txt.substring(0, lastIndex);
        o.innerHTML = txt + '…';
    }
}

window.addEventListener(
    'resize',
    function() {
        var list = document.body.getElementsByClassName('info-item__title');
        for (var i = 0; i < list.length; i++) {
            cropTextToFit(list[i]);
        }
    },
    true
);