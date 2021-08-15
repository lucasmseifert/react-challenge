import React from "react";
import { useCalendarContext } from "../../context/context";
import { getMonthIdFromDate } from "../../utils";
import Month from "../month/Month";


function Calendar() {
  const currentMonth = (new Date());
  // Set the first day of the month as the month ID
  const monthId = getMonthIdFromDate(currentMonth);

  return <section className='container'>
    <h1>Calendar</h1>
    <Month monthId={ monthId } />
  </section>
}

export default Calendar;