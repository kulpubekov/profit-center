import React, {useContext} from 'react';
import StatsButtons from "./statsButtons";
import StatsField from "./statsField";
import {Context} from '../utils/context'

const App = () => {

  const context = useContext(Context)
  const {average, standardDeviation, mode, median, lostQuotation, calculateTime} = context;

  return (
    <div className="general-wrapper">
      <div className="container">
        <StatsButtons/>
        <div className="row">
          <StatsField label={'среднее'} data={average}/>
          <StatsField label={'стандартное отклонение'} data={standardDeviation}/>
          <StatsField label={'мода(может быть множество мод)'} data={mode}/>
          <StatsField label={'медиана'} data={median}/>
          <StatsField label={'количество потерянных котировок'} data={lostQuotation}/>
          <StatsField label={'время расчета'} data={calculateTime}/>
        </div>
      </div>
    </div>
  );
};

export default App;
