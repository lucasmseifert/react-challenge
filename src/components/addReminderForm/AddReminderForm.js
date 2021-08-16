import React from 'react';
import { useCalendarContext } from '../../context/context';
import { v4 as uuidv4 } from 'uuid';
import './AddReminderForm.css';

function AddReminderForm({day, monthId, closeModal}) {

  const {
    addReminder,
  } = useCalendarContext();

  function addReminderHandler(event) {
    event.preventDefault();
    console.log(event);
    const form = event.target;
    const formData = new FormData(form);
    console.log();
    
    const text = formData.get('reminder-text');
    const time = formData.get('reminder-time');
    const color = formData.get('reminder-color');
    const city = formData.get('reminder-city');
    const id = uuidv4();

    console.log(text, time, color, city, id, day, monthId);

    addReminder(monthId, day - 1, {
      id,
      text,
      city,
      time,
      color,
    });

    closeModal();
  }

  return <form className='form' onSubmit={addReminderHandler}>
    <div className='form__item'>
      <label htmlFor='reminder-text'>Reminder text</label>
      <input name='reminder-text' id='reminder-text' required />
    </div>
    <div className='form__item'>
      <label htmlFor='reminder-city'>Reminder city</label>
      <input name='reminder-city' id='reminder-city' />
    </div>
    <div className='form__item'>
      <label htmlFor='reminder-time'>Reminder time</label>
      <input type='time' name='reminder-time' id='reminder-time' required />
    </div>
    <div className='form__item'>
      <label htmlFor='reminder-color'>Reminder color</label>
      <input type='color' name='reminder-color' id='reminder-color' />
    </div>
    <button type='submit'>Add reminder</button>
  </form>
}

export default AddReminderForm;
