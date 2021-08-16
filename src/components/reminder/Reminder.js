import React from 'react';
import './Reminder.css';

function Reminder ({
  id,
  city,
  color,
  text,
  time
}) {
  return <div className='reminder' style={{
    backgroundColor: color,
  }}>
    <span className='reminder__time'>{time}</span> - <span className='reminder__text'>{text}</span>
  </div>
}

export default Reminder;