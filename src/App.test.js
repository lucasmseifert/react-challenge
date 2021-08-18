import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import App from './App';
import CalendarContextProvider, { useCalendarContext } from './context/context';


it("renders without crashing", () => {
  const div = document.createElement("div");
  render(
    <CalendarContextProvider>
      <App />
    </CalendarContextProvider>
    , div);
});

it("Test the add reminder functionality", () => {
  // The addReminder function is inside a context. I didn't manage to test it invoking here,
  // as that was violating the React hook rule. I tried doing it like bellow, but that is throwing errors
  // because the modal is using ReactDOM.createPortal it seems. No idea how to go forward.
  const { container, rerender } = render(
  <CalendarContextProvider>
    <App />
  </CalendarContextProvider>);
  const addReminderButton = getByTestId(container, "add-reminder-day-4");

  // This throws 'Target container is not a DOM element.'
  fireEvent.click(addReminderButton);

  //const inputName = getByTestId(container, "inputName");
  //const submitButton = getByTestId(container, "submitRefButton");
  //const newName = "Ben";
  //fireEvent.change(inputName, { target: { value: newName } });
  //expect(nameValue.textContent).toEqual(newName);
  rerender(
    <CalendarContextProvider>
      <App /> 
    </CalendarContextProvider> 
  );
  //expect(window.localStorage.getItem("name")).toBe(newName);
});