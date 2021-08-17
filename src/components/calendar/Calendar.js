import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useCalendarContext } from "../../context/context";
import Month from "../month/Month";
import './Calendar.css';

function Calendar() {
  const { shownMonth, changeMonth } = useCalendarContext();

  return <section className='calendar container'>
    <div className='calendar__header'>
      <h1>Calendar: { shownMonth }</h1>
      <div className='calendar__actions'>
        <button className='calendar__action button button--icon' onClick={() => changeMonth(-1)}><FaChevronLeft/></button>
        <button className='calendar__action button button--icon' onClick={() => changeMonth(1)}><FaChevronRight/></button>
      </div>
    </div>
    <Month monthId={ shownMonth } />
  </section>
}

export default Calendar;