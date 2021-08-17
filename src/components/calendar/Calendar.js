import React from "react";
import { useCalendarContext } from "../../context/context";
import Month from "../month/Month";


function Calendar() {
  const { shownMonth, changeMonth } = useCalendarContext();

  return <section className='container'>
    <h1>Calendar: { shownMonth }</h1>
    <button onClick={() => changeMonth(1)}>+</button>
    <button onClick={() => changeMonth(-1)}>-</button>
    <Month monthId={ shownMonth } />
  </section>
}

export default Calendar;