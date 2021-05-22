import React, { useState } from 'react';
import dropdown from "../../assets/icons/dropdown.svg";
import './index.css';

const Selector = (props) => {
  const options = props.data;
  const [token, setToken] = useState(0);
  const [show, setShow] = useState(false);

  const handleSelect = (token) => {
    setToken(token);
    setShow(!show)
  };

  const handleShow = () => {
    setShow(true)
  }

  return (
    <div className="selector_container">
      <div className="selectHeader">
      <div className="dropdown" onClick={() => handleShow()}>
        <div>
          <img src={props.data[token].image} alt="ether" />
          <span className="currency_value">{props.data[token].name}</span>
        </div>
        <img src={dropdown} alt="dropdown" />
      </div>
        {show && (
          <div className="selectChild">
            {options.map((item, index) => (
              <div
              key={index}
              onClick={() => {
                handleSelect(index);
              }}
              >
                <img src={item.image} alt={index}/>
                <div className="select_option">
                  {item.name}
                </div>
              </div>

            ))}
          </div>
        )}
      </div>
      {show && <div onClick={() => setShow(false)} className="backBg" />}
    </div>
  )
}

export default Selector
