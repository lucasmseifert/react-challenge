export function daysInMonth(date) {
  // instantiate a date object
  const dt = new Date(date);

  // dt.getMonth() will return a month between 0 - 11
  // we add one to get to the last day of the month 
  // so that when getDate() is called it will return the last day of the month
  let month = dt.getMonth() + 1;
  let year = dt.getFullYear();

  // this line does the magic (in collab with the lines above)
  return new Date(year, month, 0).getDate();
}

export function getMonthIdFromDate(date) {
  return `${date.getUTCMonth() + 1}-1-${date.getUTCFullYear()}`;
}

export function getDateFromMonthId(monthId) {
  return (new Date(monthId)).toLocaleDateString(undefined, {year: 'numeric', month: 'long'});
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

export function binarySearch(ar, el, compare_fn) {
  if (ar.length === 0 || compare_fn(ar[0], el))
      return 0;
  if (compare_fn(el, ar[ar.length-1]))
      return ar.length;
  let m = 0;
  let n = ar.length - 1;
  while (m <= n) {
      let k = (n + m) >> 1;
      let cmp = compare_fn(el, ar[k]);
      if (cmp > 0) {
          m = k + 1;
      } else if(cmp < 0) {
          n = k - 1;
      } else {
          return k;
      }
  }
  return -m - 1;
}