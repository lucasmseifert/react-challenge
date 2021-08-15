export function daysInMonth(date) {
  // instantiate a date object
  const dt = new Date(date);

  // dt.getMonth() will return a month between 0 - 11
  // we add one to get to the last day of the month 
  // so that when getDate() is called it will return the last day of the month
  var month = dt.getMonth() + 1;
  var year = dt.getFullYear();

  // this line does the magic (in collab with the lines above)
  return new Date(year, month, 0).getDate();
}

export function getMonthIdFromDate(date) {
  return `${date.getMonth() + 1}-1-${date.getFullYear()}`;
}

export function getWeekdayName(weekday) {
  switch (weekday) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return '';
  }
}