import React from 'react';

const StatsButtons = ({setStarted, calculateItems, isDataAvailable, isStarted}) => {
  return (
    <div className="stats-buttons">
      <button type="button" className="btn btn-primary" disabled={isStarted} onClick={() => setStarted(true)}>Старт</button>
      <button type="button" className="btn btn-info"  onClick={calculateItems} disabled={!isDataAvailable || !isStarted}>Статистика</button>
    </div>
  );
};

export default StatsButtons;
