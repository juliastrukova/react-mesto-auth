import React, { useContext } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);

    return (
      <main className="content">
        <section className="profile">
            <div className="profile__avatar-container">
                <button type="button" className="button profile__avatar-button"  onClick={onEditAvatar}></button>
                <img id="profileAvatar" src={currentUser.avatar} alt="аватар профиля" className="profile__avatar" />
            </div>
            <div className="profile__info">
                <h1 id="profileName" className="profile__name">{currentUser.name}</h1>
                <p  id= "profileAbout" className="profile__description">{currentUser.about}</p>
                <button type="button" className="button profile__edit-button" onClick={onEditProfile}></button>
            </div>           
            <button type="button" className="button profile__add-button" onClick={onAddPlace}></button>
        </section>
      <section className="photo-grid">
        {cards.map((card) => (
            <Card 
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
            />
        ))} 
     </section>
 </main>
    );    
}

export default Main;