import React from 'react';
import './Reminder.css';
import { useCalendarContext } from '../../context/context';
import { FaTrash } from 'react-icons/fa';

function Reminder({
  id,
  city,
  background,
  fontColor,
  text,
  time,
  day,
  monthId,
}) {
  const { deleteReminder } = useCalendarContext();

  return <div className='reminder' style={{
    backgroundColor: background,
    color: fontColor,
  }}>
    <span className='reminder__time'>{time}</span> - <span className='reminder__text'>{text}</span>
    <button onClick={ () => deleteReminder(monthId, day - 1, id)}><FaTrash/></button>
  </div>
}

export default Reminder;