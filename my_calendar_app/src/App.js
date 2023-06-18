
import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import CalendarPanel from './calendar';
import SquadDetails from './squadDetails';
import Header from './Header';
function App() {
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [currentYear, setCurrentYear] = useState(getCurrentYear());
  const squads = getCurrentMonthDays(currentMonth, currentYear);

  function getCurrentMonth() {
    const date = new Date();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[date.getMonth()];
  }

  function getCurrentYear() {
    const date = new Date();
    return date.getFullYear();
  }

  function getCurrentMonthDays(month, year) {
    const monthIndex = new Date(Date.parse(month + ' 1, ' + year)).getMonth();
    return new Date(year, monthIndex + 1, 0).getDate();
  }

  function handlePreviousMonth() {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const currentIndex = monthNames.indexOf(currentMonth);
    let newMonth = currentMonth;
    let newYear = currentYear;
    
    if (currentIndex === 0) {
      newMonth = monthNames[11];
      newYear = currentYear - 1;
    } else {
      newMonth = monthNames[currentIndex - 1];
    }
    
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  }

  function handleNextMonth() {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const currentIndex = monthNames.indexOf(currentMonth);
    let newMonth = currentMonth;
    let newYear = currentYear;
    
    if (currentIndex === 11) {
      newMonth = monthNames[0];
      newYear = currentYear + 1;
    } else {
      newMonth = monthNames[currentIndex + 1];
    }
    
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  }

  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route
          path="/"
          element={
            <CalendarPanel
              squads={squads}
              currentMonth={currentMonth}
              currentYear={currentYear}
              onPreviousMonth={handlePreviousMonth}
              onNextMonth={handleNextMonth}
            />
          }
        />
        <Route path="/squad/:year/:month/:day" element={<SquadDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
//import CalendarPanel from './calendar';
//import SquadDetails from './squadDetails';