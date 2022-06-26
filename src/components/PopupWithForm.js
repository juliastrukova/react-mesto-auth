import React from 'react';

function PopupWithForm ({title, name, buttonText="Сохранить", isOpen, onClose, children, onSubmit}) {
    
    return(
      <section  className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
        <div className="popup__container">
          <button className="button popup__button-close" type="button" onClick={onClose}></button>
          <form className="popup__form" name={name} onSubmit={onSubmit} noValidate>          
            <h2 className="popup__edit-profile">{title}</h2>
            <fieldset className="popup__form-set">
            {children}
            <button className="popup__button-save button" type="submit">{buttonText}</button>
            </fieldset>
          </form>
        </div>
      </section >
    )
}

export default PopupWithForm;