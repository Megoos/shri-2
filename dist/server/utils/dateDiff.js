"use strict";
module.exports = function dateDiff(duration) {
    var seconds = parseInt(duration, 10) % 60;
    var minutes = parseInt(duration, 10) / 60 % 60;
    var hours = parseInt(duration, 10) / 360 % 24;
    if (seconds < 10)
        seconds = '0' + seconds;
    if (minutes < 10)
        minutes = '0' + minutes;
    if (hours < 10)
        hours = '0' + hours;
    return hours + ':' + minutes + ':' + seconds;
};
