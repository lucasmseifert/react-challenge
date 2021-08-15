import React from 'react';
import { useEffect, useState } from 'react';
import { useCalendarContext } from '../../context/context';
import { getWeekdayName } from '../../utils';
import Reminder from '../reminder/Reminder';
import './Day.css';

function Day({ id, weekday, day, reminders }) {
  const {
    addReminder,
  } = useCalendarContext();

  const [reminderState, setReminderState] = useState(reminders);

  return <div className='day'>
    <p className='day__weekday'>{getWeekdayName(weekday)}</p>
    <div className='day__body'>
      <span className='day__number'>{day}</span>
      {
        reminderState.map((reminder, index) => {
          return <Reminder key={`${id}-${index}`} />
        })
      }
    </div>
    {/* <button onClick={() => {
      setReminderState([...reminderState,'test']);
      console.log(reminders);
    }}>click to add reminder</button> */}
  </div>
}

export default Day;