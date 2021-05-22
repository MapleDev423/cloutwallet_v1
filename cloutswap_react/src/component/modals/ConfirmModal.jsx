import React, { useState } from 'react';
import Modal from 'react-modal';
import closeSmall from '../../assets/icons/close_small.svg';

const customStyles = {
  content : {
    top : '50%',
    left : '50%',
    right : 'auto',
    bottom : 'auto',
    marginRight : '-50%',
    transform : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

const ConfirmModal = (props) => {
    const [tab, setTab] = useState(0);
    return (
      <Modal
        isOpen={props.isOpen ? true: false}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="text-16 confirm_container">
          <p className="text-18 mt-30 text-center">Swap 6.969 BitClout for ETH</p>
          <p className="amount text-34 bold mt-20 text-center">6.969</p>
          <p className="text-18 gray text-center mt-10">$1,188.14</p>
          <div className="tab mt-30 text-18 flex">
            <div className="confirm_item bold" onClick={() => setTab(0)}>
              <span>Details</span>
              { tab === 0 && <div><div></div></div> }
            </div>
            <div className="confirm_item bold" onClick={() => setTab(1)}>
              <span>Data</span>
              { tab === 1 && <div><div></div></div>}
            </div>
          </div>
          <div className="divider"></div>
          <div className="content flex justify-between">
            <p>Gas fee</p>
            <div>
              <p>0.00000061 ETH</p>
              <span>$5.32</span>
            </div>
          </div>
          <div className="content flex justify-between">
            <div>
              <p>Total</p>
              <span>(Amount + Gas fees)</span>
            </div>
            <div>
              <p>0.0000061 ETH</p>
              <span>$1,193.55</span>
            </div>
          </div>
          <div className="flex mt-30">
            <div className="w-full" style={{marginRight: "10px"}}>
              <div className="swapcard_btn_red" onClick={() => props.closeModal()}>
                <p>Cancel</p>
              </div>
            </div>
            <div 
              className="w-full" style={{marginLeft: "10px"}}
              onClick={() => props.onConfirm()}
            >
              <div className="swapcard_btn">
                <p>Confirm</p>
              </div>
            </div>
          </div>
        </div>
        <img 
          className="close_modal" 
          src={closeSmall} alt="close"
          onClick={() => props.closeModal()}
        />
      </Modal> 
    );
}

export default ConfirmModal;