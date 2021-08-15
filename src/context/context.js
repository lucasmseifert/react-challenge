import React from 'react';
import { useContext } from 'react';

const CalendarContext = React.createContext();

function CalendarContextProvider({children}) {
  return <CalendarContext.Provider value={{
    test: 'test',
  }}>
    { children }
  </CalendarContext.Provider>
}

export default CalendarContextProvider;

export function useCalendarContext() {
  return useContext(CalendarContext);
}