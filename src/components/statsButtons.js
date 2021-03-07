import React, {useContext} from 'react';
import {Context} from "../utils/context";

const StatsButtons = () => {
  const context = useContext(Context)
  const {
    setStarted, calculateItems, isDataAvailable, isStarted} = context;

  return (
    <div className="stats-buttons">
      <button type="button" className="btn btn-primary" disabled={isStarted} onClick={() => setStarted(true)}>Старт</button>
      <button type="button" className="btn btn-info"  onClick={calculateItems} disabled={!isDataAvailable || !isStarted}>Статистика</button>
    </div>
  );
};

export default StatsButtons;
