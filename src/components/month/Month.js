import React from 'react';
import { useCalendarContext } from "../../context/context";
import { getWeekdayName } from '../../utils';
import Day from '../day/Day';
import './Month.css';

function Month({
  monthId
}) {
  const { getMonth } = useCalendarContext();
  const { days } = getMonth(monthId);

  const firstWeekday = days[0].weekday;
  const lastWeekday = days[days.length - 1].weekday;
  
  // Check if the month needs prefix or suffix days
  const prefixDays = [];
  const suffixDays = [];
  for(let i = 0; i < firstWeekday; i++) {
    prefixDays.push(<div key={`${monthId}-prefix-${i}`} className='day day--fill'></div>);
  }
  for(let i = lastWeekday; i < 7; i++) {
    suffixDays.push(<div key={`${monthId}-suffix-${i}`} className='day day--fill'></div>);
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
      { prefixDays }
      {
        days.map((day, index) => {
          return <Day key={day.id} {...day} monthId={monthId} />
        })
      }
      { suffixDays }
    </div>
  )
}

export default Month;