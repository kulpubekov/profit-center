import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import {millisToMinutesAndSeconds} from "./utils/index";
import {
  getStandardDeviationPromise,
  getAveragePromise,
  getModePromise,
  getMedianPromise
} from './workers/workerPromises';

import {Context} from './utils/context';
import App from "./components/App";

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const AppContainer = () => {
  const webSocketUrl = 'wss://trade.trademux.net:8800/?password=1234';
  const [data, setData] = useState({});
  const [current, setCurrent] = useState(null);
  const [lostData, setLostData] = useState(0);
  const [isStarted, setStarted] = useState(false);
  const prevId = usePrevious(current);
  const [average, setAverage] = useState('');
  const [standardDeviation, setStandardDeviation] = useState('');
  const [mode, setMode] = useState('');
  const [median, setMedian] = useState('');
  const [lostQuotation, setLostQuotation] = useState('');
  const [calculateTime, setCalculateTime] = useState('');
  const [isDataAvailable, setDataAvailable] = useState(false);
  const [isCalculateProcess, setCalculateProcess] = useState(false);

  useEffect(() => {
    let ws = null;
    if (isStarted) {
      ws = new WebSocket(webSocketUrl)
      ws.onopen = () => {
        console.log('opened');
      };
      ws.onmessage = (event) => {
        const response = JSON.parse(event.data);
        checkData(data, response);
        setDataAvailable(true);
      };
      ws.onclose = () => {
        ws.close();
      };
    }
    return () => {
      if (ws !== null) {
        ws.close();
      }
    };
  }, [isStarted]);


  useEffect(() => {
    if (!current || !prevId) return;
    if (current - prevId > 1) {
      setLostData(prev => prev + (current - prevId - 1))
    }
  }, [current]);

  const checkData = (data, {value, id}) => {
    setCurrent(id);
    setData(prev => {
      prev[value] = prev[value] ? prev[value] + 1 : 1;
      return prev;
    })
  };

  const calculateItems = async () => {
    if (isStarted && isDataAvailable) {
      const startDate = new Date();
      const arr = Object.entries(data);

      const [
        standardDeviationPromiseResult, averagePromiseResult,
        modePromiseResult, medianPromiseResult] = await Promise.all(
        [getStandardDeviationPromise(arr),
          getAveragePromise(arr),
          getModePromise(arr),
          getMedianPromise(data)
        ]);

      const time = millisToMinutesAndSeconds(new Date() - startDate);
      setCalculateTime(`${time} сек`);
      setAverage(averagePromiseResult);
      setStandardDeviation(`${standardDeviationPromiseResult}`);
      setMode(modePromiseResult);
      setMedian(medianPromiseResult);
      setLostQuotation(`${lostData}`);
    }

  };

  const contextData = {
    isStarted, setStarted, calculateItems, isDataAvailable, average, isCalculateProcess,
    standardDeviation, mode, median, lostQuotation, calculateTime, setCalculateProcess
  }

  return (
    <Context.Provider value={contextData}>
      <App/>
    </Context.Provider>
  )
};

export default AppContainer;
