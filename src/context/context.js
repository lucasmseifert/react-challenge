import React, { useState, useContext } from 'react';
import { daysInMonth } from '../utils';

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

  console.log(localStorageMonths);

  const [months, setMonths] = useState(localStorageMonths);

  function addMonth(monthId) {
    console.log('adding'); 
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

    console.log(monthDays);

    const newMonth = {
      monthId,
      days,
    }

    // The months state will hold all the months handled by the calendar
    // The data will be saved on a different localStorage item to prevent having to load
    // all the months from the storage.
    months[monthId] = monthId;
    localStorage.setItem('months', JSON.stringify(months));
    localStorage.setItem(monthId, JSON.stringify(newMonth));
    setMonths(months);
  }

  function getMonth(monthId) {
    console.log(monthId);
    const trackedMonths = Object.keys(months);
    const monthIndex = trackedMonths.indexOf(monthId);

    if(monthIndex === -1) {
      // If the month is not tracked, track it
      addMonth(monthId);
    }

    // Return the data saved on this month
    return JSON.parse(localStorage.getItem(monthId));
  }

  return <CalendarContext.Provider value={{
    months,
    getMonth,
  }}>
    {children}
  </CalendarContext.Provider>
}

export default CalendarContextProvider;

export function useCalendarContext() {
  return useContext(CalendarContext);
}