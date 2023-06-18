import React from 'react';
import { Link } from 'react-router-dom';

const CalendarPanel = ({ squads, currentYear, currentMonth, onPreviousMonth, onNextMonth }) => {
  const squadPanelStyle = {
    width: '55px',
    height: '55px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    margin: '5px',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  };

  const panelStyle = {
    borderRadius: '10px',
    backgroundColor: '#f2f2f2',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };

  const generateSquadRows = () => {
    const squadRows = [];
    let squadNumber = 1;

    while (squadNumber <= squads) {
      const rowSquads = Array.from({ length: Math.min(7, squads - squadNumber + 1) }, () => squadNumber++);
      squadRows.push(rowSquads);
    }

    return squadRows;
  };

  return (
    <div class="panel_calendar" style={panelStyle}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <button class="button_for_calendar" onClick={onPreviousMonth}>Previous</button>
        <span style={{ margin: '0 10px' }}>{`${currentMonth} ${currentYear}`}</span>
        <button class="button_for_calendar" onClick={onNextMonth}>Next</button>
      </div>
      {generateSquadRows().map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', justifyContent: 'center' }}>
          {row.map((squadNumber) => (
            <Link key={squadNumber} to={`/squad/${currentYear}/${currentMonth}/${squadNumber}`}>
              <div style={squadPanelStyle}>
                <span class="number_in_squad">{squadNumber}</span>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CalendarPanel;