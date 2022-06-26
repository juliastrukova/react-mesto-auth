import React, {useEffect, useState} from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
      api.getAllData()
          .then(([cards, res]) => {
              setCurrentUser(res);
              setCards(cards);
          })
          .catch(err => console.log(err));
  }, []);


  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardLike = (card)  => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.toggleLike(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => console.log(err));
  } 

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
    .then(() => {
      setCards(cards.filter((currentUser) => currentUser._id !== card._id));
    })
    .catch(err => console.log(err));
  }

  const handleUpdateUser = (newInfo) => {
    api.setUser(newInfo.name, newInfo.about)
        .then((user) => {
            setCurrentUser(user);
            closeAllPopups();
        })
        .catch(err => console.log(err));
  }
  const handleUpdateAvatar = (newAvatar) => {
    api.setAvatar(newAvatar.avatar)
        .then((user) => {
            setCurrentUser(user);
            closeAllPopups();
        })
        .catch(err => console.log(err));
  }
  const handleAddPlaceSubmit = (card) => {
    api.addCard(card.name, card.link)
        .then((res) => {
            setCards([res, ...cards]);
            closeAllPopups();
        })
        .catch(err => console.log(err));
  }
    
  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header/>
      <Main
       onEditProfile={handleEditProfileClick}
       onAddPlace={handleAddPlaceClick}
       onEditAvatar={handleEditAvatarClick}
       onCardClick={handleCardClick}
       onCardLike={handleCardLike}
       onCardDelete={handleCardDelete}
       cards={cards}
      />
      <Footer/>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
       />
      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        />
      <PopupWithForm
          name="delete"
          title="Вы уверены?"
          buttonText="Да">
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
  </div>
  </CurrentUserContext.Provider>
  );
}

export default App;