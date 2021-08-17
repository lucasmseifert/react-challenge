import React, { useState } from 'react';
import { useCalendarContext } from '../../context/context';
import './EditReminderForm.css';

function EditReminderForm(props) {

  const {
    id,
    city,
    background,
    fontColor,
    text,
    time,
    day,
    monthId,
    closeModal,
  } = props;

  const {
    editReminder,
  } = useCalendarContext();

  // Create a new date with the month and day information
  const currentDate = new Date(monthId);
  currentDate.setDate(day);

  const [textState, setTextState] = useState(text);
  const [cityState, setCityState] = useState(city);
  const [timeState, setTimeState] = useState(time);
  const [backgroundColor, setBackgroundColor] = useState(background);
  const [fontColorState, setFontColorState] = useState(fontColor);
  const [currentDay, setCurrentDay] = useState(currentDate.toISOString().split('T')[0]);

  function editReminderHandler(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const text = formData.get('reminder-text');
    const time = formData.get('reminder-time');
    const fontColor = formData.get('reminder-font-color');
    const background = formData.get('reminder-background-color');
    const city = formData.get('reminder-city');
    const newDay = formData.get('reminder-day');

    editReminder(monthId, day - 1, id, newDay, {
      id,
      text,
      city,
      time,
      background,
      fontColor
    });

    closeModal();
  }

  return <form className='form formEdit' onSubmit={editReminderHandler}>
    <div className='form__item'>
      <label htmlFor='reminder-text'>Reminder text</label>
      <input maxLength='30' name='reminder-text' id='reminder-text' required value={textState} onChange={(event) => setTextState(event.target.value)} />
    </div>
    <div className='form__item'>
      <label htmlFor='reminder-city'>Reminder city</label>
      <input name='reminder-city' id='reminder-city' value={cityState} onChange={ (event) => setCityState(event.target.value) } />
    </div>
    <div className='form__item'>
      <label htmlFor='reminder-day'>Reminder day</label>
      <input type='date' name='reminder-day' id='reminder-day' required value={currentDay} onChange={(event) => setCurrentDay(event.target.value) } />
    </div>
    <div className='form__item'>
      <label htmlFor='reminder-time'>Reminder time</label>
      <input type='time' name='reminder-time' id='reminder-time' required value={timeState} onChange={ (event) => setTimeState(event.target.value )} />
    </div>
    <div className='form__item'>
      <label htmlFor='reminder-background-color'>Reminder background color</label>
      <input type='color' name='reminder-background-color' id='reminder-background-color' value={backgroundColor} onChange={(event) => {
        setBackgroundColor(event.target.value);
      }} />
    </div>
    <div className='form__item'>
      <label htmlFor='reminder-font-color'>Reminder font color</label>
      <input type='color' name='reminder-font-color' id='reminder-font-color' value={fontColorState} onChange={(event) => {
        setFontColorState(event.target.value);
      }} />
    </div>
    <div className='form__preview' style={{
      backgroundColor: backgroundColor,
      color: fontColorState,
    }}>
      This is the preview text for the reminder color scheme.
    </div>
    <button type='submit'>Edit reminder</button>
  </form>
}

export default EditReminderForm;
