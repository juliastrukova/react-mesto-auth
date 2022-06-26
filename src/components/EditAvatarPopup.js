import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarUrl = useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarUrl.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          name="avatarUrl"
          type="url"
          id="avatarUrl"
          required
          placeholder="Ссылка на картинку"
          className="popup__edit-info"
          ref={avatarUrl}
        />
        <span
          id="avatarUrlError"
          className="popup__error popup__error_visible"
        ></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
