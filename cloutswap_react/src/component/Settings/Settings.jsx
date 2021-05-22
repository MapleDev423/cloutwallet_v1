import React, { useState } from 'react';
import './index.css';
import info from '../../assets/icons/info.svg';
import { Switch } from '../switch';
import Info from './Info';

const slippage = "Your transaction will revert if the price changes unfavourably by more than this percentage."
const deadline = "Your transaction will revert if it is pending for more than this long.";
const tog_expert = "Bypasses confirmation modals and allows high slippage trades. Use at your own risk.";
const disable_mul = "Restrict swaps to direct pairs only";

const percent = [0.1, 0.5, 1, 1];

const Settings = () => {
  const [active, setActive] = useState(0);
  
  const onActive = (key) => {
    setActive(key)
  }

  return (
    <div className="settings_container">
      <div className="_settings mt-10">
        <p className="text-center text-18 bold">Transaction Settings</p>
        <div className="flex mt-20">
          <p className="text-14">Slippage tolerance</p>
          <div className="relative _hover">
            <img src={info} alt="info"/>
            <Info className="info_box" content={slippage}/>
          </div>
        </div>
        <div className="flex mt-10">
          {percent.map((per, index) => 
            <div 
              key={index}
              className={`item ${active === index ? 'active' : ''}`}
              onClick={() => onActive(index)}
            >
              <span className="text-16">{per}%</span>
            </div>
          )}
        </div>
        <div className="flex mt-30">
          <p className="text-14">Transaction deadline</p>
          <div className="relative _hover">
            <img src={info} alt="info"/>
            <Info className="info_box" content={deadline}/>
          </div>
        </div>
        <div className="flex mt-10 text-16 items-center">
          <div className="item">
            <span>20</span>
          </div>
          <p>minutes</p>
        </div>
      </div>
      <div className="_settings">
        <p className="text-center text-18 bold">Interface Setting</p>
        <div className="flex justify-between mt-16">
          <div className="flex items-center">
            <p>Toggle expert mode</p>
            <div className="relative _hover">
              <img src={info} alt="info"/>
              <Info className="info_box" content={tog_expert}/>
            </div>
          </div>
          <Switch />
        </div>
        <div className="flex justify-between mt-16">
          <div className="flex">
            <p>Disable multihops</p>
            <div className="relative _hover">
              <img src={info} alt="info"/>
              <Info className="info_box" content={disable_mul}/>
            </div>
          </div>
          <Switch />
        </div>
      </div>
    </div>
  )
}

export default Settings;