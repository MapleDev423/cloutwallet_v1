import React from 'react';
import './index.css';

const Switch = () => {
  return <div className="switch_container">
    <label className="switch">
      <input type="checkbox" />
      <span className="slider round"></span>
    </label>
  </div>
}

export default Switch;