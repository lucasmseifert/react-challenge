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

  const [months, setMonths] = useState(localStorageMonths);

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
    const trackedMonths = Object.keys(months);
    const monthIndex = trackedMonths.indexOf(monthId);

    if(monthIndex === -1) {
      // If the month is not tracked, track it
      addMonth(monthId);
    }

    // Return the data saved on this month
    return JSON.parse(localStorage.getItem(monthId));
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

  function editReminder (monthId, dayNumber, reminderId, newDay, reminder) {
    console.log(monthId);
    console.log(dayNumber);
    console.log(reminderId);
    console.log(newDay);
    console.log(reminder);
    // All the reminders follow a strict ordering on the addition, so the easiest way to
    // edit is delete the reminder and adding it back.
    deleteReminder(monthId, dayNumber, reminderId);

    // Now we add it back, calculating new monthId and day number based on the newDay passed
    const newDateObject = new Date(newDay);
    const newMonthId = getMonthIdFromDate(newDateObject);
    const newDate = newDateObject.getDate();

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
    getMonth,
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