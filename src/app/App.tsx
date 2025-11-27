import { useState } from 'react';
import { Calendar } from '../features/calendar';

export default function App() {
  const today = new Date();
  const dateString = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  
  return (
    <div className='calendar-app'>
      <div className="calendar-header">
        <h2 className='calendar-info'>Wasmer – Day Calendar</h2>
        <h1 className='calendar-date'>{dateString}</h1> 
        <p className='calendar-instruction'>
          Open the browser console and call <code>layOutDay(events)</code>.
        </p>
      </div>
      <div className="calendar-container-wrapper">
        <div className="calendar-wrapper">
          <Calendar />
        </div>
      </div>
    </div>
  );
}