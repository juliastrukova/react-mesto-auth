import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup ({ onClose, isOpen, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  return(
    <PopupWithForm
      title="Новое место"
      name="card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      >
      <label className="popup__field">
        <input id="cardName" name="cardName" type="text" value={name} minLength="2" maxLength="30" required placeholder="Название" className="popup__edit-info" onChange={handleNameChange}/>
        <span id="cardNameError" className="popup__error popup__error_visible"></span>
      </label>
      <label className="popup__field">
        <input id="cardUrl" name="cardUrl" type="url" value={link} required placeholder="Ссылка на картинку" className="popup__edit-info"  onChange={handleLinkChange}/>
        <span id="cardUrlError" className="popup__error popup__error_visible"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;