import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (`button card__delete ${isOwn ? '' : 'card__delete_hidden'}`);
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`button card__like ${isLiked && 'card__like-active'}`);
  
  const handleCardClick = () => {
      onCardClick(card)
  }

  const handleCardLike  = () => {
    onCardLike(card)
  }

  const handleCardDelete  = () => {
    onCardDelete(card)
  }

  return (
    <div className="card">
      <button type="button" className={cardDeleteButtonClassName} onClick={handleCardDelete}></button>
      <img className="card__image" alt={card.name} src={card.link} onClick={handleCardClick} />
      <h2 className="card__title">{card.name}</h2>
      <div className="card__like-container">
        <button type="button" className={cardLikeButtonClassName} onClick={handleCardLike}></button>
         <p className="card__like-number">{card.likes.length}</p>
      </div>
    </div>
  )
}
export default Card;