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