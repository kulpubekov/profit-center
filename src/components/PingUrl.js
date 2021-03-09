import React, {useState} from 'react';
import Ping from 'ping.js';

const PingUrl = () => {
  const [text, setText] = useState('');
  const p = new Ping();
  const [pingResult, setPingResult] = useState('');
  const second = 1000;

  const pingAddress = (url) => {

    if(text=== '') {
      return
    }

    p.ping(url, function (err, data) {
      if (err) {
        setPingResult(`${data} ${err}`)
      }
      setPingResult(data)
    });
  };

  return (
    <div className='ping-block'>
      <div className="row row-column">
        <div className="col-xs-12 col-lg-6  custom-field ">
          <label htmlFor='pingValue' className="form-label">Введите адрес для пинга</label>
         <div className="d-flex">
           <input type="text"
                  className="form-control"
                  id='pingvVlue' value={text}
                  onChange={(e) => setText(e.target.value)}/>
           <button type="button" className="btn btn-primary" onClick={pingAddress}>Пингануть</button>
         </div>
        </div>
        <div className="col-xs-6 col-lg-2  custom-field">
          <label htmlFor={'Результат'} className="form-label">Результат</label>
          <input type="text" className="form-control" id={'Результат'} value={pingResult / second} readOnly
                 onChange={() => {
                 }}/>
        </div>
      </div>
    </div>
  );
};

export default PingUrl;
