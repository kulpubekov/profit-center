import React, {useContext} from 'react';
import StatsField from "./StatsField";
import {Context} from '../utils/context'
import PingUrl from "./PingUrl";

const App = () => {

  const context = useContext(Context)
  const {
    average, standardDeviation, mode, median, lostQuotation, calculateTime, isStarted,
    calculateItems,setStarted, isDataAvailable} = context;
  return (
    <div className="general-wrapper">
      <div className="container">
        <div className="stats-buttons">
          <button type="button" className="btn btn-primary" disabled={isStarted} onClick={() => setStarted(true)}>Старт</button>
          <button type="button" className="btn btn-info"  onClick={calculateItems} disabled={!isDataAvailable || !isStarted}>Статистика</button>
        </div>
        <div className="row">
          <StatsField label={'среднее'} data={average}/>
          <StatsField label={'стандартное отклонение'} data={standardDeviation}/>
          <StatsField label={'мода(может быть множество мод)'} data={mode}/>
          <StatsField label={'медиана'} data={median}/>
          <StatsField label={'количество потерянных котировок'} data={lostQuotation}/>
          <StatsField label={'время расчета'} data={calculateTime}/>
        </div>
        <PingUrl/>
      </div>
    </div>
  );
};

export default App;
