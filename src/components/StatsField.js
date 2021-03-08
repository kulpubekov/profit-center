import React from 'react';

const StatsField = ({label, data}) => {
  return (
    <div className="col-xs-12 col-lg-4  custom-field">
      <label htmlFor={label} className="form-label">{label}</label>
      <input type="text" className="form-control" id={label} value={data} readOnly onChange={()=>{}}/>
    </div>
  );
};

export default StatsField;
