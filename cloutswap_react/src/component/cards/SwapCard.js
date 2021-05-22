import React, { useState } from "react";
import "./index.css";
import setting from "../../assets/icons/setting.svg";
import swap from "../../assets/icons/swap.svg";
import Settings from "../Settings/Settings";
import Selector from "../DropdownSelector/Selector";
import { tokenFrom, tokenTo } from "../../constant/token";
import ConfirmModal from "../modals/ConfirmModal";
import SuccessModal from "../modals/SuccessModal";

import info from "../../assets/icons/info.svg";

export default function SwapCard() {
  const [showSetting, setShowSetting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [successModal, setSuccessMoal] = useState(false);

  return (
    <div className="swapcard_container">
      <div className="swapcard_top">
        <div className="header">
          <p>Swap</p>
          <img
            src={setting}
            alt="setting"
            onClick={() => setShowSetting(true)}
          />
          {showSetting && <Settings />}
          {showSetting && (
            <div onClick={() => setShowSetting(false)} className="backBg" />
          )}
        </div>
        <div className="swap_values">
          <div className="top">
            <div className="info">
              <p className="label">Swap from</p>
              <input
                className="amount"
                pattern="^[0-9]*[.,]?[0-9]*$"
                inputMode="decimal"
                placeholder="0.0"
                spellCheck={false}
                autoComplete="off"
                type="number"
              />
              <p className="balance">Balance: 70.42</p>
            </div>
            <div style={{ zIndex: "40" }}>
              <Selector data={tokenTo} />
            </div>
          </div>
          <div className="middle">
            <div className="mid_line"></div>
            <img src={swap} alt="swap" />
          </div>
          <div className="bottom">
            <div className="info">
              <p className="label">Swap to</p>
              <input
                className="amount"
                pattern="^[0-9]*[.,]?[0-9]*$"
                inputMode="decimal"
                placeholder="0.0"
                spellCheck={false}
                autoComplete="off"
                type="number"
              />
              <p className="balance">Balance: -</p>
            </div>
            <div>
              <Selector data={tokenFrom} />
            </div>
          </div>
        </div>
      </div>
      <div className="statistic text-16">
        <div className="flex justify-between mt-10">
          <div className="flex">
            <p>Price</p>
            <img src={info} alt="info" />
          </div>
          <p>$ 2,866</p>
        </div>
        <div className="flex justify-between mt-10">
          <div className="flex">
            <p>Minimum received</p>
            <img src={info} alt="info" />
          </div>
          <p>2,866 $btclt</p>
        </div>
        <div className="flex justify-between mt-10">
          <div className="flex">
            <p>Price Impact</p>
            <img src={info} alt="info" />
          </div>
          <p>$ 0.5%</p>
        </div>
        <div className="flex justify-between mt-10">
          <div className="flex">
            <p>Liquidity Provider Fee</p>
            <img src={info} alt="info" />
          </div>
          <p>0.012 $btclt</p>
        </div>
      </div>
      <ConfirmModal
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        onConfirm={() => {
          setOpenModal(false);
          setSuccessMoal(true);
        }}
      />
      <SuccessModal
        isOpen={successModal}
        closeModal={() => setSuccessMoal(false)}
      />

      <div className="swapcard_btn" onClick={() => setOpenModal(true)}>
        <p>Confirm Swap</p>
      </div>
    </div>
  );
}
