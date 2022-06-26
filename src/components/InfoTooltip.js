import React from "react";

function InfoTooltip({ isOpen, image, onClose, message }) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__authorization-container">
        <img className="popup__authorization-image" alt={message} src={image} />
        <p className="popup__authorization-text">{message}</p>
        <button
          type="button"
          className="button popup__authorization-close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;