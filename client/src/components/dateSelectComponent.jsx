import { useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { DateSelectContext } from "../Contexts/DateSelectContext.jsx";

const DateSelect = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(DateSelectContext);

  const handleMonthChange = (event) => {
    dispatch({ type: "SET_MONTH", payload: event.target.value });
  };

  const handleDayChange = (event) => {
    dispatch({ type: "SET_DAY", payload: event.target.value });
  };

  const goToSelectedDay = () => {
    navigate(`/otdih/${state.selectedMonth}/${state.selectedDay}`);
  };

  return (
    <>
      <select
        value={state.selectedMonth}
        onChange={handleMonthChange}
        className={"selectMonth"}
      >
        <option value="">Select Month</option>
        {state.months.map((month, index) => (
          <option key={index} value={month}>
            {month}
          </option>
        ))}
      </select>
      <select
        value={state.selectedDay}
        onChange={handleDayChange}
        className={"selectDay"}
      >
        <option value="">Select Day</option>
        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
      <button className="otdButton" id="goButton" onClick={goToSelectedDay}>
        Go
      </button>
    </>
  );
};

export default DateSelect;