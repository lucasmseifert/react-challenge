import React, { useState } from 'react';
import { getWeekdayName } from '../../utils';
import Reminder from '../reminder/Reminder';
import Modal from '../modal/Modal';
import AddReminderForm from '../addReminderForm/AddReminderForm';
import './Day.css';

import { FaPlus } from 'react-icons/fa';

function Day({ id, weekday, day, reminders, monthId }) {
  const [showModal, setShowModal] = useState(false);

  return <div className='day'>
    <p className='day__weekday'>{getWeekdayName(weekday)}</p>
    <div className='day__body'>
      <span className='day__number'>{day}</span>
      {
        reminders.map((reminder, index) => {
          return <Reminder key={`reminder-${id}-${index}`} {...reminder} />
        })
      }
    </div>
    <button className='day__add-reminder' aria-label={`Add reminder to day ${day}`} title='Add reminder' onClick={() => {
      setShowModal(true);
    }}><FaPlus /></button>
    {
      showModal && (
        <Modal isOpen={showModal} setIsOpen={setShowModal}>
          <AddReminderForm day={day} monthId={monthId} closeModal={()=>setShowModal(false)} />
        </Modal>
      )
    }
  </div>
}

export default Day;