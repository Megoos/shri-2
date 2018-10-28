module.exports = function dateDiff(duration: string): string {

  let seconds: number | string = parseInt(duration, 10) % 60;

  let minutes: number | string = parseInt(duration, 10) / 60 % 60;

  let hours: number | string = parseInt(duration, 10) / 360 % 24;

  if (seconds < 10) seconds = '0' + seconds;
  if (minutes < 10) minutes = '0' + minutes;
  if (hours < 10) hours = '0' + hours;

  return hours + ':' + minutes + ':' + seconds;
};
