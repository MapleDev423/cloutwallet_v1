import React from "react";
import Modal from "react-modal";
import closeSmall from "../../assets/icons/close_small.svg";
import check from "../../assets/icons/check.svg";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const SuccessModal = (props) => {
  return (
    <Modal
      isOpen={props.isOpen ? true : false}
      onRequestClose={props.closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="success_modal_container">
        <img src={check} alt="check" />
        <p className="text-22 bold text-center mt-30">Transaction Submitted</p>
        <p className="text-16 text-center gray mt-20">
          Swapping 0.345 ElnMsk for 9.232 Jeff Bezos.
        </p>
        <div className="swapcard_btn" onClick={() => props.closeModal()}>
          <p>Close</p>
        </div>
      </div>
      <img
        className="close_modal"
        src={closeSmall}
        alt="close"
        onClick={() => props.closeModal()}
      />
    </Modal>
  );
};

export default SuccessModal;
