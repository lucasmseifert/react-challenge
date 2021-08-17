import React, { useState } from 'react';
import { useCalendarContext } from '../../context/context';
import { v4 as uuidv4 } from 'uuid';

function AddReminderForm({ day, monthId, closeModal }) {

  const {
    addReminder,
  } = useCalendarContext();

  const [background, setBackground] = useState('#ffffff');
  const [fontColor, setFontColor] = useState('#000000');

  function addReminderHandler(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const text = formData.get('reminder-text');
    const time = formData.get('reminder-time');
    const fontColor = formData.get('reminder-font-color');
    const background = formData.get('reminder-background-color');
    const city = formData.get('reminder-city');
    const id = uuidv4();

    addReminder(monthId, day - 1, {
      id,
      text,
      city,
      time,
      background,
      fontColor
    });

    closeModal();
  }

  return <form className='form' onSubmit={addReminderHandler}>
    <div className='form__item'>
      <label htmlFor='reminder-text'>Reminder text</label>
      <input maxLength='30' name='reminder-text' id='reminder-text' required />
    </div>
    <div className='form__item'>
      <label htmlFor='reminder-city'>Reminder city</label>
      <input name='reminder-city' id='reminder-city' />
    </div>
    <div className='form__item'>
      <label htmlFor='reminder-time'>Reminder time</label>
      <input type='time' name='reminder-time' id='reminder-time' required />
    </div>
    <fieldset className='form__reminder-color'>
      <div className='form__item'>
        <label htmlFor='reminder-background-color'>Reminder background color</label>
        <input type='color' name='reminder-background-color' id='reminder-background-color' value={background} onChange={(event) => {
          setBackground(event.target.value);
        }} />
      </div>
      <div className='form__item'>
        <label htmlFor='reminder-font-color'>Reminder font color</label>
        <input type='color' name='reminder-font-color' id='reminder-font-color' value={fontColor} onChange={(event) => {
          setFontColor(event.target.value);
        }} />
      </div>
      <div className='form__preview' style={{
        backgroundColor: background,
        color: fontColor,
      }}>
        This is the preview text for the reminder color scheme.
      </div>
    </fieldset>
    <button className='button' type='submit'>Add reminder</button>
  </form>
}

export default AddReminderForm;
