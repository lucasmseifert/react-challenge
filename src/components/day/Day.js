import React, { useState } from 'react';
import { getWeekdayName } from '../../utils';
import Reminder from '../reminder/Reminder';
import Modal from '../modal/Modal';
import AddReminderForm from '../addReminderForm/AddReminderForm';
import { useCalendarContext } from '../../context/context';
import './Day.css';

import { FaPlus, FaTrash } from 'react-icons/fa';

function Day({ id, weekday, day, reminders, monthId }) {
  const { deleteAllReminders } = useCalendarContext();

  const [showModal, setShowModal] = useState(false);

  return <div className='day'>
    <p className='day__weekday'>{getWeekdayName(weekday)}</p>
    <div className='day__body'>
      <span className='day__number'>{day}</span>
      {
        reminders.map((reminder, index) => {
          return <Reminder key={`reminder-${id}-${index}`} {...reminder} day={day} monthId={monthId} />
        })
      }
    </div>
    <button className='day__add-reminder' aria-label={`Add reminder to day ${day}`} title='Add reminder' onClick={() => {
      setShowModal(true);
    }}><FaPlus /></button>
    <button className='day__delete-all' aria-label='Remove all reminders' title='Remove all reminders' onClick={() => {
      deleteAllReminders(monthId, day - 1);
    }}><FaTrash /></button>
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