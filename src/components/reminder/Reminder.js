import React, { useState } from 'react';
import './Reminder.css';
import { useCalendarContext } from '../../context/context';
import Modal from '../modal/Modal';
import EditReminderForm from '../editReminderForm/EditReminderForm';
import { FaPen, FaTrash } from 'react-icons/fa';

function Reminder(props) {
  const {
    id,
    background,
    fontColor,
    text,
    time,
    day,
    monthId,
    fill,
  } = props;

  const { deleteReminder } = useCalendarContext();
  const [showEdit, setShowEdit] = useState(false);
  return <div className='reminder' style={{
    backgroundColor: background,
    color: fontColor,
  }}>
    <p className='reminder__body'>
      <span className='reminder__time'>{time}</span> - <span className='reminder__text'>{text}</span>
    </p>
    {
      !fill && (
        <div className='reminder__actions'>
          <button className='button' onClick={() => setShowEdit(true)} aria-label='Edit reminder' title='Edit reminder'><FaPen /></button>
          <button className='button' onClick={() => deleteReminder(monthId, day - 1, id)} aria-label='Delete reminder' title='Delete reminder'><FaTrash /></button>
        </div>
      )
    }
    {
      showEdit && (
        <Modal isOpen={showEdit} setIsOpen={setShowEdit}>
          <EditReminderForm {...props} closeModal={() => setShowEdit(false)} />
        </Modal>
      )
    }
  </div>
}

export default Reminder;