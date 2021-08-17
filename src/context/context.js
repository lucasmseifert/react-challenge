import React, { useState, useContext } from 'react';
import { daysInMonth, binarySearch, getMonthIdFromDate } from '../utils';

const CalendarContext = React.createContext();

function CalendarContextProvider({ children }) {
  let localStorageMonths = localStorage.getItem('months');

  if (!localStorageMonths) {
    // If there's still nothing on localStorage, initialize the empty state
    localStorageMonths = {};
    localStorage.setItem('months', JSON.stringify({}))
  } else {
    // Else, parse whats saved and use it so set the state bellow
    localStorageMonths = JSON.parse(localStorageMonths);
  }

  const currentMonth = (new Date());
  // Set the first day of the month as the month ID
  currentMonth.setMonth(currentMonth.getMonth());
  const monthId = getMonthIdFromDate(currentMonth);

  const [months, setMonths] = useState(localStorageMonths);
  const [shownMonth, setShownMonth] = useState(monthId);

  if (!months[monthId]) {
    addMonth(monthId);
  }

  function changeMonth(increment) {
    let newMonth = (new Date(shownMonth));
    newMonth.setMonth(newMonth.getMonth() + increment);
    newMonth = getMonthIdFromDate(newMonth);
    const trackedMonths = Object.keys(months);
    const monthIndex = trackedMonths.indexOf(newMonth);

    if (monthIndex === -1) {
      // If the month is not tracked, track it
      addMonth(newMonth);
    }

    setShownMonth(newMonth);
  }

  function addMonth(monthId) {
    const monthDays = daysInMonth(monthId);
    let firstDay = new Date(monthId);
    const days = [];

    for (let i = 0; i < monthDays; i++) {
      let currentDay = new Date(firstDay);
      currentDay.setDate(firstDay.getDate() + i);

      days.push({
        id: currentDay.toDateString(),
        weekday: currentDay.getDay(),
        day: currentDay.getDate(),
        reminders: [],
      });
    }

    const newMonth = {
      monthId,
      days,
    }

    // The months state will hold all the months handled by the calendar
    // The data will be saved on a different localStorage item to prevent having to load
    // all the months from the storage.
    months[monthId] = {
      monthId,
      updated: (new Date()).getTime(),
    }

    localStorage.setItem('months', JSON.stringify(months));
    localStorage.setItem(monthId, JSON.stringify(newMonth));
    setMonths(Object.assign({}, months));
  }

  function getMonth(monthId) {
    // Return the data saved on this month
    return JSON.parse(localStorage.getItem(monthId));
  }

  // This function will retrieve the last days of the previous month
  function getPreviousMonthDays(days) {
    const currentMonth = (new Date(shownMonth));
    // Get the previous month
    currentMonth.setMonth(currentMonth.getMonth() - 1);

    const previousMonthId = getMonthIdFromDate(currentMonth);
    const previousMonth = getMonth(previousMonthId);
    const previousMonthDays = previousMonth.days.slice(0 - days);
    return previousMonthDays;
  }

  function getNextMonthDays(days) {
    const currentMonth = (new Date(shownMonth));
    // Get the next month
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    const nextMonthId = getMonthIdFromDate(currentMonth);
    const nextMonth = getMonth(nextMonthId);
    const nextMonthDays = nextMonth.days.slice(0, days);
    return nextMonthDays;
  }

  function addReminder(monthId, dayNumber, reminder) {
    const month = getMonth(monthId);

    function compareReminder(a, b) {
      return a.time > b.time;
    }

    // When we add we make sure it's being placed in a sorted manner.
    const reminders = month['days'][dayNumber].reminders;
    const index = binarySearch(reminders, reminder, compareReminder);
    reminders.splice(index, 0, reminder);

    month['days'][dayNumber].reminders = reminders;
    months[monthId]['updated'] = (new Date()).getTime();
    localStorage.setItem(monthId, JSON.stringify(month));
    // We assign a new state to trigger updates on the calendar
    setMonths(Object.assign({}, months));
  }

  function editReminder(monthId, dayNumber, reminderId, newDay, reminder) {
    // All the reminders follow a strict ordering on the addition, so the easiest way to
    // edit is delete the reminder and adding it back.
    deleteReminder(monthId, dayNumber, reminderId);
    // Now we add it back, calculating new monthId and day number based on the newDay passed
    const newDateObject = new Date(newDay);
    const newMonthId = getMonthIdFromDate(newDateObject);
    const newDate = newDateObject.getUTCDate() - 1;

    addReminder(newMonthId, newDate, reminder);
  }

  function deleteReminder(monthId, dayNumber, reminderId) {
    let month = getMonth(monthId);
    const reminders = month['days'][dayNumber].reminders;

    const newReminders = reminders.filter((item) => {
      return item.id !== reminderId;
    });

    month['days'][dayNumber].reminders = newReminders;

    months[monthId]['updated'] = (new Date()).getTime();
    localStorage.setItem(monthId, JSON.stringify(month));
    // We assign a new state to trigger updates on the calendar
    setMonths(Object.assign({}, months));
  }

  function deleteAllReminders(monthId, dayNumber) {
    let month = getMonth(monthId);

    // To delete all the reminders, just assign a new array
    month['days'][dayNumber].reminders = [];

    months[monthId]['updated'] = (new Date()).getTime();
    localStorage.setItem(monthId, JSON.stringify(month));
    // We assign a new state to trigger updates on the calendar
    setMonths(Object.assign({}, months));
  }

  return <CalendarContext.Provider value={{
    months,
    shownMonth,
    getMonth,
    getPreviousMonthDays,
    getNextMonthDays,
    changeMonth,
    addReminder,
    editReminder,
    deleteReminder,
    deleteAllReminders,
  }}>
    {children}
  </CalendarContext.Provider>
}

export default CalendarContextProvider;

export function useCalendarContext() {
  return useContext(CalendarContext);
}