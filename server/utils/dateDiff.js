module.exports = function dateDiff(date1, date2) {
    var hours, minutes, seconds;
    hours = date2.getUTCHours() - date1.getUTCHours();
    minutes = date2.getUTCMinutes() - date1.getUTCMinutes();
    seconds = date2.getUTCSeconds() - date1.getUTCSeconds();

    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
    }

    if (seconds < 10) seconds = '0' + seconds;
    if (minutes < 10) minutes = '0' + minutes;
    if (hours < 10) hours = '0' + hours;

    return `${hours}:${minutes}:${seconds}`;
}