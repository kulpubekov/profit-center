import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import {millisToMinutesAndSeconds, getStandardDeviation, getAverage, getMode, getMedian} from "./utils/index";
import {Context} from './utils/context';
import App from "./components/App";

function usePrevious(value) {
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

  useEffect(() => {
    const ws = new WebSocket(webSocketUrl);
    if (isStarted) {
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
      ws.close();
    };
  }, [isStarted]);


  useEffect(() => {
    if (!current || !prevId) return;
    if (current - prevId > 1) {
      setLostData(prev => prev + 1)
    }
  }, [current]);

  const checkData = (data, {value, id}) => {
    setCurrent(id);
    setData(prev => {
      prev[value] = prev[value] ? prev[value] + 1 : 1;
      return prev;
    })
  }

  const calculateItems = async () => {

    if (isStarted && isDataAvailable) {
      const startDate = new Date();
      const getStandardDeviationPromise = (data) => new Promise((resolve) => resolve(getStandardDeviation(data)))
      const getAveragePromise = (data) => new Promise((resolve) => resolve(getAverage(data)))
      const getModePromise = (data) => new Promise((resolve) => resolve(getMode(data)))
      const getMedianPromise = (data) => new Promise((resolve) => resolve(getMedian(data)))
      const [
        standardDeviationPromiseResult,
        averagePromiseResult,
        modePromiseResult,
        medianPromiseResult] = await Promise.all(
        [getStandardDeviationPromise(data),
          getAveragePromise(data),
          getModePromise(data),
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
  }

  const contextData = {
    isStarted, setStarted, calculateItems, isDataAvailable, average,
    standardDeviation, mode, median, lostQuotation, calculateTime
  }

  return (
    <Context.Provider value={contextData}>
      <App/>
    </Context.Provider>
  )
};

export default AppContainer;
