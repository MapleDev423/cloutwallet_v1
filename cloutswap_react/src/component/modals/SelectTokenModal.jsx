import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import ether from '../../assets/icons/ether.svg'
import closeSmall from '../../assets/icons/close_small.svg';

import './index.css'

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
// will be remove when integration with backend
const tokensConst = ["Elon Musk", "The Night King", "Jon Snow", "Tywin Lannister", "Daenerys Targaryen", "Lord Varys"]

const Token = ({ text, className, onClick }) => {
  return <div 
      className={`token_container ${className}`}
      onClick={() => onClick()}
    >
    <p>{text}</p>
    <img src={ether} alt="ether"/>
  </div>
} 

const SelectTokenModal = (props) => {
    const [search, setSearch] = useState('');
    const [tokens, setTokens] = useState(tokensConst)
    const [active, setActive] = useState(0)

    const handleChange = (e) => {
      setSearch(e.target.value)
    }

    useEffect(() => {
      if(search === "") setTokens([...tokensConst]);
      let newToken = tokensConst.filter(token => token.toUpperCase().indexOf(search.toUpperCase()) > -1)
      setTokens([...newToken])
    }, [search])
    
    return (
      <Modal
        isOpen={props.isOpen ? true: false}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="select_token_wrapper mt-20">
          <p className="text-22 bold text-center">Select a token</p>
          <div className="search mt-20">
            <input value={search} placeholder="Search for a token" onChange={handleChange}/>
          </div>
          <div className="token_wrapper mt-30">
            {tokens.map((token, i )=> 
              <Token
                className={active === i ? 'active' : ''}
                onClick={() => setActive(i)}
                key={i} 
                text={token}
              />
            )}
          </div>
          <div className="swapcard_btn" onClick={() => console.log("click connect button")}>
            <p>Connect</p>
          </div>
          <img 
            className="close_modal" 
            src={closeSmall} alt="close"
            onClick={() => props.closeModal()}
          />
        </div>
      </Modal> 
    );
}

export default SelectTokenModal;
