import React from 'react';

const Info = ({ content, className }) => {
  return <div className={`info_container ${className}`}>
    <p className="text-12">{content}</p>
    <div className="pointer"></div>
  </div>
}

export default Info;
