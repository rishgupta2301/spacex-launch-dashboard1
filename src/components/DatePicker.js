import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({ isOpen, onClose, onChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onChange(start, end);
  };

  return (
    <div className={`date-picker ${isOpen ? 'open' : 'closed'}`}>
      <div className="header">
        <button onClick={onClose}>X</button>
      </div>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
    </div>
    
  );
};

export default CustomDatePicker;
