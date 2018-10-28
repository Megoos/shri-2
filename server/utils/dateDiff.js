module.exports = function dateDiff(duration) {
    let seconds = parseInt(duration % 60),
        minutes = parseInt((duration / 60) % 60),
        hours = parseInt((duration / 360) % 24);

    if (seconds < 10) seconds = '0' + seconds;
    if (minutes < 10) minutes = '0' + minutes;
    if (hours < 10) hours = '0' + hours;

    return hours + ':' + minutes + ':' + seconds;
};
