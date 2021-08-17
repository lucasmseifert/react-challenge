import React from 'react';
import { useCalendarContext } from "../../context/context";
import { getWeekdayName } from '../../utils';
import Day from '../day/Day';
import './Month.css';

function Month({
  monthId
}) {
  const { 
    getMonth, 
    getPreviousMonthDays, 
    getNextMonthDays,
    changeMonth
  } = useCalendarContext();

  const { days } = getMonth(monthId);

  const firstWeekday = days[0].weekday;
  const lastWeekday = days[days.length - 1].weekday;
  
  let prefixDays = []
  let suffixDays = [];
  // Check if the month needs prefix or suffix days
  if (firstWeekday) {
    prefixDays = getPreviousMonthDays(firstWeekday);
  }

  if (lastWeekday < 6) {
    suffixDays = getNextMonthDays((7 - lastWeekday) - 1);
  }

  const weekdays = [];

  for(let i = 0; i < 7; i++) {
    weekdays.push(<span key={`${monthId}-weekday-${i}`}>{getWeekdayName(i)}</span>);
  }

  return (
    <div className='month'>
      <div className='month__weekdays'>
        { weekdays }
      </div>
      {
        prefixDays.map((day, index) => {
          return <Day key={day.id} {...day} fill={true} onClick={() => changeMonth(-1)} />
        })
      }
      {
        days.map((day, index) => {
          return <Day key={day.id} {...day} monthId={monthId} />
        })
      }
      { 
        suffixDays.map((day, index) => {
          return <Day key={day.id} {...day} fill={true} onClick={() => changeMonth(1)} />
        })
      }
    </div>
  )
}

export default Month;