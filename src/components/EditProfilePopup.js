import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup ({ isOpen, onClose, onUpdateUser }){
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return(
    <PopupWithForm
      title="Редактировать профиль"
      name="user"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      >
      <label className="popup__field">
          <input id="name" type="text" name="name" minLength="2" maxLength="40"  value={name || ''} required placeholder="Ваше имя" className="popup__edit-info" onChange={handleNameChange} />
          <span id="nameError" className="popup__error popup__error_visible"></span>
      </label>
      <label className="popup__field">
          <input id="about" type="text" name="about" minLength="2" maxLength="200"  value={description || ''} required  placeholder="Ваш род деятельности" className="popup__edit-info"  onChange={handleDescriptionChange} />
          <span id="aboutError" className="popup__error popup__error_visible"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;